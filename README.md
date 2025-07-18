# Japanese Laws MCP Server

[![Version](https://img.shields.io/github/v/release/michimani/jpn-laws-mcp-server)](https://github.com/michimani/jpn-laws-mcp-server/releases/latest)
[![License](https://img.shields.io/github/license/michimani/jpn-laws-mcp-server)](./LICENSE)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue.svg)](https://github.com/michimani/jpn-laws-mcp-server/pkgs/container/jpn-laws-mcp-server)

**TODO: Description**

## Table of Contents

- [Japanese Laws MCP Server](#japanese-laws-mcp-server)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [MCP Tools](#mcp-tools)
  - [License](#license)
  - [Author](#author)
  - [Credits](#credits)

## Usage

To use this server with an MCP client, add the following configuration:

```json
{
  "mcpServers": {
    "jpn-laws-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "ghcr.io/michimani/jpn-laws-mcp-server:latest"
      ]
    }
  }
}
```

## MCP Tools

**TODO: Add MCP tools here**

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

[michimani](https://github.com/michimani)

## Credits

This project is based on [koki-develop/mcp-server-template](https://github.com/koki-develop/mcp-server-template) by [Koki Sato](https://github.com/koki-develop).
