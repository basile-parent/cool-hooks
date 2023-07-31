# Make a release

## Use the release script
There is 3 scripts in the `package.json` made to create the release easily :
- `npm run release:major`
- `npm run release:minor`
- `npm run release:patch`

These scripts create the Github tag and release

> If the release script fail to create the release, you have to do it manually in Github

## Publish release in NPM
As soon as the github release is published, the [NPM publish](https://github.com/basile-parent/cool-hooks/actions/workflows/npm_package.yml) action runs and publish the version in NPM.

So nothing to do here.

## Update README if needed
If the release ends a milestone, remove / update the milestone version from the [README.md](./README.md) file.