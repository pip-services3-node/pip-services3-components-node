"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module config
 *
 * Todo: Rewrite this description
 *
 * @preferred
 * Contains implementation of the config design pattern.
 *
 * ConfigReader's Parameterize method allows us to take a standard configuration, and,
 * using a set of current parameters (e.g. environment variables), parameterize it. When
 * we create the configuration of a container, we can use environment variables to tailor
 * it to the system, dynamically add addresses, ports, etc.
 */
var ConfigReader_1 = require("./ConfigReader");
exports.ConfigReader = ConfigReader_1.ConfigReader;
var FileConfigReader_1 = require("./FileConfigReader");
exports.FileConfigReader = FileConfigReader_1.FileConfigReader;
var JsonConfigReader_1 = require("./JsonConfigReader");
exports.JsonConfigReader = JsonConfigReader_1.JsonConfigReader;
var MemoryConfigReader_1 = require("./MemoryConfigReader");
exports.MemoryConfigReader = MemoryConfigReader_1.MemoryConfigReader;
var YamlConfigReader_1 = require("./YamlConfigReader");
exports.YamlConfigReader = YamlConfigReader_1.YamlConfigReader;
var DefaultConfigReaderFactory_1 = require("./DefaultConfigReaderFactory");
exports.DefaultConfigReaderFactory = DefaultConfigReaderFactory_1.DefaultConfigReaderFactory;
//# sourceMappingURL=index.js.map