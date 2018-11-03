# Component definitions for Pip.Services in Node.js Changelog

## <a name="3.0.2"></a> 3.0.2 (2018-08-02) 

### Breaking changes
* Shutdown.isOpened() is now Shutdown.isOpen()

## <a name="3.0.0"></a> 3.0.0 (2018-07-21) 

### Features
* **test** Added Shutdown
* Added Component

### Breaking changes
* Moved component definitions into a separate package

## <a name="2.10.0"></a> 2.10.0 (2018-03-26) 

### Features
* **count** Added reset_timeout parameter to CachedCounter

### Breaking changes
* Added ContextInfo and InfoFactory

## <a name="2.9.0"></a> 2.9.0 (2018-03-20) 

### Breaking changes
* Moved FluentdLogger, MemcachedCache and MemcachedLock to pip-services-oss package
* Changed logical group in descriptors to 'pip-services'

## <a name="2.8.0"></a> 2.8.0 (2018-03-01) 

### Features
* Moved from mustache to handlebars

## <a name="2.8.0"></a> 2.8.0 (2018-02-17) 

### Features
* Added lock package for distributed locks
* Added memcached cache and lock
* Added JsonConverter.fromToObject() method
* Added Fluentd logger

## <a name="2.7.0"></a> 2.7.0 (2017-09-30) 

### Features
* Integrated mustache template engine to parameterize config files

## <a name="2.3.10"></a> 2.3.10 (2017-04-19)

### Bug Fixed
* Fixed connection resolution in MemoryDiscovery
* Fixed number of defects in ConnectionResolver
* Fixed number of defects in CredentialResolver

## <a name="2.3.0"></a> 2.3.0 (2017-04-11)

### Features
* **config** Added parameters to ConfigReader.readConfig()

## <a name="2.2.4"></a> 2.2.4 (2017-04-09)

### Bug Fixed
* Code cleanup after sync with Python

## <a name="2.0.8"></a> 2.0.8 (2017-03-16)

### Breaking Changes
* ConnectionParams.getUri() now returns stored property instead of calculating it

## <a name="2.0.0"></a> 2.0.0 (2017-02-24)

Cleaned up and simplified dependency management and object creation.

### Features
* **build** Added Factory

### Breaking Changes
* Refactored **refer** package. Removed IDescriptable and ILocateable interface. Made locator a mandatory requirement to place component into references.
* Moved **ManagedReferences** to **pip-services-container**
* Made **IConfigReader** interface asynchronous

### Bug Fixes
* Replaced log formatting with C-like format from **util** package

## <a name="1.0.0"></a> 1.0.0-1.0.3 (2017-01-28 - 2017-02-24)

Initial public release

### Features
* **build** Component factories framework
* **config** Configuration framework
* **count** Performance counters components
* **log** Logging components

