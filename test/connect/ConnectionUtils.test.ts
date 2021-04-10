const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { ConnectionUtils } from '../../src/connect/ConnectionUtils';

suite('ConnectionUtils', ()=> {

    test('Concat Options', () => {
		let options1 = ConfigParams.fromTuples(
            "host", "server1",
            "port", "8080",
            "param1", "ABC"
        );

		let options2 = ConfigParams.fromTuples(
            "host", "server2",
            "port", "8080",
            "param2", "XYZ"
        );

        let options = ConnectionUtils.concat(options1, options2);

        assert.equal(4, options.length());
		assert.equal("server1,server2", options.getAsNullableString("host"));
		assert.equal("8080,8080", options.getAsNullableString("port"));
		assert.equal("ABC", options.getAsNullableString("param1"));
		assert.equal("XYZ", options.getAsNullableString("param2"));
	});

    test('Include Keys', () => {
		let options1 = ConfigParams.fromTuples(
            "host", "server1",
            "port", "8080",
            "param1", "ABC"
        );

        let options = ConnectionUtils.include(options1, "host", "port");

        assert.equal(2, options.length());
        assert.equal("server1", options.getAsNullableString("host"));
        assert.equal("8080", options.getAsNullableString("port"));
        assert.isNull(options.getAsNullableString("param1"));
    });

    test('Exclude Keys', () => {
		let options1 = ConfigParams.fromTuples(
            "host", "server1",
            "port", "8080",
            "param1", "ABC"
        );

        let options = ConnectionUtils.exclude(options1, "host", "port");

        assert.equal(1, options.length());
        assert.isNull(options.getAsNullableString("host"));
        assert.isNull(options.getAsNullableString("port"));
        assert.equal("ABC", options.getAsNullableString("param1"));
    });

    test('Parse URI', () => {
        let options = ConnectionUtils.parseUri("broker1", "kafka", 9092);
        assert.equal(4, options.length());
        assert.equal("broker1:9092", options.getAsNullableString("servers"));
        assert.equal("kafka", options.getAsNullableString("protocol"));
        assert.equal("broker1", options.getAsNullableString("host"));
        assert.equal("9092", options.getAsNullableString("port"));

        options = ConnectionUtils.parseUri("tcp://broker1:8082", "kafka", 9092);
        assert.equal(4, options.length());
        assert.equal("broker1:8082", options.getAsNullableString("servers"));
        assert.equal("tcp", options.getAsNullableString("protocol"));
        assert.equal("broker1", options.getAsNullableString("host"));
        assert.equal("8082", options.getAsNullableString("port"));

        options = ConnectionUtils.parseUri("tcp://user:pass123@broker1:8082", "kafka", 9092);
        assert.equal(6, options.length());
        assert.equal("broker1:8082", options.getAsNullableString("servers"));
        assert.equal("tcp", options.getAsNullableString("protocol"));
        assert.equal("broker1", options.getAsNullableString("host"));
        assert.equal("8082", options.getAsNullableString("port"));
        assert.equal("user", options.getAsNullableString("username"));
        assert.equal("pass123", options.getAsNullableString("password"));

        options = ConnectionUtils.parseUri("tcp://user:pass123@broker1,broker2:8082", "kafka", 9092);
        assert.equal(6, options.length());
        assert.equal("broker1:9092,broker2:8082", options.getAsNullableString("servers"));
        assert.equal("tcp", options.getAsNullableString("protocol"));
        assert.equal("broker1,broker2", options.getAsNullableString("host"));
        assert.equal("9092,8082", options.getAsNullableString("port"));
        assert.equal("user", options.getAsNullableString("username"));
        assert.equal("pass123", options.getAsNullableString("password"));

        options = ConnectionUtils.parseUri("tcp://user:pass123@broker1:8082,broker2:8082?param1=ABC&param2=XYZ", "kafka", 9092);
        assert.equal(8, options.length());
        assert.equal("broker1:8082,broker2:8082", options.getAsNullableString("servers"));
        assert.equal("tcp", options.getAsNullableString("protocol"));
        assert.equal("broker1,broker2", options.getAsNullableString("host"));
        assert.equal("8082,8082", options.getAsNullableString("port"));
        assert.equal("user", options.getAsNullableString("username"));
        assert.equal("pass123", options.getAsNullableString("password"));
        assert.equal("ABC", options.getAsNullableString("param1"));
        assert.equal("XYZ", options.getAsNullableString("param2"));
    });

    test('Parse URI', () => {
        let options = ConfigParams.fromTuples(
            "host", "broker1,broker2",
            "port", ",8082",
            "username", "user",
            "password", "pass123",
            "param1", "ABC",
            "param2", "XYZ",
            "param3", null
        );

        let uri = ConnectionUtils.composeUri(options, "tcp", 9092);
        assert.equal("tcp://user:pass123@broker1:9092,broker2:8082?param1=ABC&param2=XYZ&param3", uri);

        uri = ConnectionUtils.composeUri(options, null, null);
        assert.equal("user:pass123@broker1,broker2:8082?param1=ABC&param2=XYZ&param3", uri);
    });
});