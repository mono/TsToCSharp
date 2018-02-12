# Installing the project

## Github Repository

* Clone the TsToCSharp repository
    * For SSH

    ``` bash
    # Mac Terminal
    $ mkdir projects
    $ cd projects
    projects$
    projects$ git clone git@github.com:kjpou1/TsToCSharp.git
    ```

    * For HTTPS 

    ``` bash
    # Mac Terminal
    $ mkdir projects
    $ cd projects
    projects$
    projects$ git clone https://github.com/kjpou1/TsToCSharp.git
    ```

## Install NPM module dependencies

The following command will install all the NPM module dependencies that are used in the project.

``` bash
$ npm install
```

After the Node modules are installed and requirements setup the project will be ready to build.

## Build the project TypeScript files

The following command will compile all the TypeScript (.ts) files.

``` bash
$ npm run build-ts
```

After the compliation is complete project is ready for use.
