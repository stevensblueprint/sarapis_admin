# Sarapis Admin

# How to run?

Make sure you have the most up-to-date version of the code by running

```
git pull origin main
```

_Note_: You only need to run this command if you are working on a feature branch.

Install the dependencies

```
npm install
```

Run the React App

```
npm run dev
```

You will need to login to be able to view the protected route
Use the following credentials

```
test@blueprint.com
Blueprint1#
```

The website hits a locally running instance of the backend server. You will need to
bootstrap the backend locally. You can follow the instructions [here](https://github.com/stevensblueprint/orservice/blob/main/README.md)
to initialize the service.

The website uses some env variables, for security reason the `.env`
will be in Discord.
