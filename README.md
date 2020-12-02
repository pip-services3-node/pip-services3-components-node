# <img src="https://uploads-ssl.webflow.com/5ea5d3315186cf5ec60c3ee4/5edf1c94ce4c859f2b188094_logo.svg" alt="Pip.Services Logo" width="200"> <br/> Component definitions for Node.js

This module is a part of the [Pip.Services](http://pipservices.org) polyglot microservices toolkit.

The Components module contains standard component definitions that can be used to build applications and services.

The module contains the following packages:
- **Auth** - authentication credential stores
- **Build** - basic factories for constructing objects
- **Cache** - distributed cache
- **Config** - configuration readers and managers, whose main task is to deliver configuration parameters to the application from wherever they are being stored
- **Connect** - connection discovery and configuration services
- **Count** - performance counters
- **Info** - context info implementations that manage the saving of process information and sending additional parameter sets
- **Lock** -  distributed lock components
- **Log** - basic logging components that provide console and composite logging, as well as an interface for developing custom loggers
- **Test** - minimal set of test components to make testing easier
- **Component** - the root package

<a name="links"></a> Quick links:

* [Logging](https://www.pipservices.org/recipies/logging)
* [Configuration](https://www.pipservices.org/recipies/configuration) 
* [API Reference](https://pip-services3-node.github.io/pip-services3-components-node/globals.html)
* [Change Log](CHANGELOG.md)
* [Get Help](https://www.pipservices.org/community/help)
* [Contribute](https://www.pipservices.org/community/contribute)

## Use

Install the NPM package as
```bash
npm install pip-services3-components-node --save
```

Example how to use Logging and Performance counters.
Here we are going to use CompositeLogger and CompositeCounters components.
They will pass through calls to loggers and counters that are set in references.

```typescript
import { ConfigParams } from 'pip-services3-commons-node'; 
import { IConfigurable } from 'pip-services3-commons-node'; 
import { IReferences } from 'pip-services3-commons-node'; 
import { IReferenceable } from 'pip-services3-commons-node'; 
import { CompositeLogger } from 'pip-services3-components-node'; 
import { CompositeCounters } from 'pip-services3-components-node'; 

export class MyComponent implements IConfigurable, IReferenceable {
  private _logger: CompositeLogger = new CompositeLogger();
  private _counters: CompositeCounters = new CompositeCounters();
  
  public configure(config: ConfigParams): void {
    this._logger.configure(config);
  }
  
  public setReferences(refs: IReferences): void {
    this._logger.setReferences(refs);
    this._counters.setReferences(refs);
  }
  
  public myMethod(correlationId: string, param1: any, callback: (err: any, result: any) => void): void {
    this._logger.trace(correlationId, "Executed method mycomponent.mymethod");
    this._counters.increment("mycomponent.mymethod.exec_count", 1);
    let timing = this._counters.beginTiming("mycomponent.mymethod.exec_time");
    ....
    timing.endTiming();
    if (err) {
      this._logger.error(correlationId, err, "Failed to execute mycomponent.mymethod");
      this._counters.increment("mycomponent.mymethod.error_count", 1);
    }
    ...
  }
}
```

Example how to get connection parameters and credentials using resolvers.
The resolvers support "discovery_key" and "store_key" configuration parameters
to retrieve configuration from discovery services and credential stores respectively.

```typescript
import { ConfigParams } from 'pip-services3-commons-node'; 
import { IConfigurable } from 'pip-services3-commons-node'; 
import { IReferences } from 'pip-services3-commons-node'; 
import { IReferenceable } from 'pip-services3-commons-node'; 
import { IOpenable } from 'pip-services3-commons-node'; 
import { ConnectionParams } from 'pip-services3-components-node'; 
import { ConnectionResolver } from 'pip-services3-components-node'; 
import { CredentialParams } from 'pip-services3-components-node'; 
import { CredentialResolver } from 'pip-services3-components-node'; 

export class MyComponent implements IConfigurable, IReferenceable, IOpenable {
  private _connectionResolver: ConnectionResolver = new ConnectionResolver();
  private _credentialResolver: CredentialResolver = new CredentialResolver();
  
  public configure(config: ConfigParams): void {
    this._connectionResolver.configure(config);
    this._credentialResolver.configure(config);
  }
  
  public setReferences(refs: IReferences): void {
    this._connectionResolver.setReferences(refs);
    this._credentialResolver.setReferences(refs);
  }
  
  ...
  
  public open(correlationId: string, callback: (err: any) => void): void {
    this._connectionResolver.resolve(correlationId, (err, connection) => {
      if (err) {
        if (callback) callback(err);
        return;
      }
      
      this._credentialResolver.lookup(correlationId, (err, credential) => {
        if (err) {
          if (callback) callback(err);
          return;
        }
        
        let host = connection.getHost();
        let port = connection.getPort();
        let user = credential.getUsername();
        let pass = credential.getPassword();
        
        ...
      }
    }
  }
}

// Using the component
let myComponent = new MyComponent();

myComponent.configure(ConfigParams.fromTuples(
  'connection.host', 'localhost',
  'connection.port', 1234,
  'credential.username', 'anonymous',
  'credential.password', 'pass123'
));

myComponent.open(null, (err) => {
...
});
```

Example how to use caching and locking.
Here we assume that references are passed externally.

```typescript
import { Descriptor } from 'pip-services3-commons-node'; 
import { References } from 'pip-services3-commons-node'; 
import { IReferences } from 'pip-services3-commons-node'; 
import { IReferenceable } from 'pip-services3-commons-node'; 
import { ILock } from 'pip-services3-components-node'; 
import { MemoryLock } from 'pip-services3-components-node'; 
import { ICache } from 'pip-services3-components-node'; 
import { MemoryCache } from 'pip-services3-components-node'; 

export class MyComponent implements IReferenceable {
  private _cache: ICache;
  private _lock: ILock;
  
  public setReferences(refs: IReferences): void {
    this._cache = refs.getOneRequired<ICache>(new Descriptor("*", "cache", "*", "*", "1.0"));
    this._lock = refs.getOneRequired<ILock>(new Descriptor("*", "lock", "*", "*", "1.0"));
  }
  
  public myMethod(correlationId: string, param1: any, callback: (err: any, result: any) => void): void {
    // First check cache for result
    this._cache.retrieve(correlationId, "mykey", (err, result) => {
      if (err != null || result != null) {
        callback(err, result);
        return;
      }
      
      // Lock..
      this._lock.acquireLock(correlationId, "mykey", 1000, 1000, (err) => {
        if (err) {
          callback(err, null);
          return;
        }
        
        // Do processing
        ...
        
        // Store result to cache async
        this._cache.store(correlationId, "mykey", result, 3600000);

        // Release lock async
        this._lock.releaseLock(correlationId, "mykey");
       
        callback(null, result);
      });
      
    }
  }
}

// Use the component
let myComponent = new MyComponent();

myComponent.setReferences(References.fromTuples(
  new Descriptor("pip-services", "cache", "memory", "default", "1.0"), new MemoryCache(),
  new Descriptor("pip-services", "lock", "memory", "default", "1.0"), new MemoryLock(),
);

myComponent.myMethod(null, (err, result) => {
...
});
```

If you need to create components using their locators (descriptors) implement 
component factories similar to the example below.

```typescript
import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

export class MyFactory extends Factory {
  public static myComponentDescriptor: Descriptor = new Descriptor("myservice", "mycomponent", "default", "*", "1.0");
  
  public MyFactory() {
    super();
    
    this.registerAsType(MyFactory.myComponentDescriptor, MyComponent);    
  }
}

// Using the factory

let myFactory = MyFactory();

let myComponent1 = myFactory.create(new Descriptor("myservice", "mycomponent", "default", "myComponent1", "1.0");
let myComponent2 = myFactory.create(new Descriptor("myservice", "mycomponent", "default", "myComponent2", "1.0");

...
```

## Develop

For development you shall install the following prerequisites:
* Node.js 8+
* Visual Studio Code or another IDE of your choice
* Docker
* Typescript

Install dependencies:
```bash
npm install
```

Compile the code:
```bash
tsc
```

Run automated tests:
```bash
npm test
```

Generate API documentation:
```bash
./docgen.ps1
```

Before committing changes run dockerized build and test as:
```bash
./build.ps1
./test.ps1
./clear.ps1
```

## Contacts

The library is created and maintained by **Sergey Seroukhov**.

The documentation is written by **Mark Makarychev**.
