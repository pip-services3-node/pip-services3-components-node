const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { NullLogger } from '../../src/log/NullLogger';
import { ConsoleLogger } from '../../src/log/ConsoleLogger';
import { CompositeLogger } from '../../src/log/CompositeLogger';
import { LogLevel } from '../../src/log/LogLevel';

suite('CompositeLogger', ()=> {
    let _logger: CompositeLogger;

    beforeEach(function() {
        _logger = new CompositeLogger();
        let refs = References.fromTuples(
            new Descriptor("pip-services", "logger", "null", "default", "1.0"), new NullLogger(), 
            new Descriptor("pip-services", "logger", "console", "default", "1.0"), new ConsoleLogger()
        );
        _logger.setReferences(refs);
    });

    test('Log Level', () => {
        assert.isTrue(_logger.getLevel() >= LogLevel.None);
        assert.isTrue(_logger.getLevel() <= LogLevel.Trace);
    });

    test('Simple Logging', () => {
        _logger.setLevel(LogLevel.Trace);

        _logger.fatal(null, null, "Fatal error message");
        _logger.error(null, null, "Error message");
        _logger.warn(null, "Warning message");
        _logger.info(null, "Information message");
        _logger.debug(null, "Debug message");
        _logger.trace(null, "Trace message");
    });

    test('Error Logging', () => {
        try {
            // Raise an exception
            throw new Error();
        } catch (ex) {
            _logger.fatal("123", ex, "Fatal error");
            _logger.error("123", ex, "Recoverable error");

            assert.isNotNull(ex);
        }
    });

});