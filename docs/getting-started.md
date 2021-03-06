## Quick Start

### With Docker

The fastest way to get started with condensation: [condensation-docker][condensation-docker-url]

```
$ alias condensation="docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN -v \"$HOME\"/.aws/credentials:/home/condensation/.aws/credentials -v \`pwd\`:/particles --rm -it sungardas/condensation"


$ condensation create project particles-MYPROJECT
$ cd particles-MYPROJECT
$ condensation run build

# Upload to S3
$ condensation run deploy
```

<a name="nodejs"></a>
### With a nodejs environment

Use the Yeoman
[generator](https://github.com/SungardAS/generator-condensation).

```
$ npm install -g yo
$ npm install -g generator-condensation
$ yo condensation:project particles-MYPROJECT
$ cd particles-MYPROJECT
$ npm run build

# Upload to S3
$ npm run deploy
```

### Example Projects

* [condensation-examples](https://github.com/SungardAS/condensation-examples)
* [particles-vpc](https://github.com/SungardAS/particles-vpc)
* [particles-cloudsploit-scans](https://github.com/SungardAS/particles-cloudsploit-scans)
* [particles-enhanced-snapshots](https://github.com/SungardAS/particles-enhanced-snapshots)

Check out the growing list of particles on
[npm](https://www.npmjs.com/browse/keyword/condensation-particles)!

[condensation-docker-url]: https://github.com/SungardAS/condensation-docker
