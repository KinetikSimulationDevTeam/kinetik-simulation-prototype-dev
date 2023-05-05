# Testing

## Frontend

Tests for `frontend src` code use [Jest](https://jestjs.io) and are organized in the `test` directory
with subdirectories that mirror the package structure.

To run the tests, simply run

```
npm test
```

Jest will automatically find all test files and run them. You can also use the --watch flag to run tests in watch mode, which will re-run tests whenever code changes are detected.

During the test run, Jest generates snapshots of rendered components, which are saved in the __snapshots__ directory in the Tests directory. You can view these snapshots to help diagnose test failures.

The tests are fully automated using GitHub Actions. We have set up a test.yml file in the .github/workflows directory that defines the test workflow. This means that every time you push changes to GitHub, the tests will automatically run on a GitHub-hosted runner. If any tests fail, you will receive a notification in GitHub.
