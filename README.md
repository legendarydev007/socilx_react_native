### Todo
- [ ] Add fastlane
- [ ] Add bugsnag
- [ ] Add storybook
- [ ] Migrate components first and then the rest of the ui
- [ ] Migrate libraries
- [ ] Implement data api
- [ ] Add redux example to enhancer (with example data api call)
- [ ] Remove deprecated @types/redux

---

### Readme
This is a yarn workspaces based mono repo boilerplate where the projects are

- commons
- storage api
- blockchain api
- data api
- react native application

The number of libraries are scoped to these top level structures because the current
implementation's generous approach to defining many top level libs create a mesh
of interdependencies, making it hard to assign library owners and maintain self
enclosed codebases. We should define top level libraries sparingly.

The following android updates have been made based on [this](http://albertgao.xyz/2018/05/30/24-tips-for-react-native-you-probably-want-to-know/)

- 2.2 update js core
- 3.1 update gradle
- 3.2 update versions

Before you begin, make sure you have installed the following tooling

- node >=8.11
- npm >=6.3
- yarn >=1.9 

To begin development, run the following commands

```
$ yarn run install
$ yarn run build
```

The build step must be repeated if modules have changed.

To run the app on the emulator/simulator, run the the following

```
$ yarn run start:js
$ yarn run start:android
$ yarn run start:ios
```

Use the latest [RN Debugger](https://github.com/jhen0409/react-native-debugger/releases)
in order to avoid compatibility issues with recent react native

There are some open issues that need to be followed

- https://github.com/facebook/react-native/issues/20415 (blocker for node globals)
- https://github.com/facebook/react-native/issues/19859 (solved with a transform hack)
- https://github.com/facebook/react-native/issues/4968 (requires occasional
`yarn run reset && yarn run install && yarn run build`)
- Since RN migrated to babel7 and [babel7 supports](https://github.com/Microsoft/TypeScript-Babel-Starter)
out of box typescript support, it seems only natural to wire everything as a normal
babel monorepo to avoid all typescript related configuration problems and bugs in
the first place, but it turns out, you still need tsc compiler to both type check
and to output a final build for the dependencies, which defeats the purpose
- postinstall script for `react-native link` outputs errors but it looks like we can ignore
it as long as fastlane or ci don't complain about it. This is due to the nohoist
mechanism used in yarn conflicting with what rn's linking tool operates.
- added two postinstall scripts for react native gradient and vector icons, but they are
hacks for existing issues and they need to be removed as soon as the issues are resolved

Tests and linting are set up as part of the pre-commit hook using husky. Beware, though,
that the style rules in the old repository were conflicting at best, therefore
during the migration, there will be lots of inconsistencies and fixing requirements.
The precommit hook may be disabled if that proves to be a big problem, allowing
for linting to be applied later, but would then be a big bulk project of its own, too.

We should also consider adding `tslint-contrib-microsoft` but it currently has too
many outstanding issues to tackle at this time.

Finally, the current linting rules as well as prettier customizations should be
reviewed to align them with general industry standards and minimize overrides.

Sidenote: Migrating to `flow` should also be considered due to its more relaxed
environment and focus on static type checking, while leaving compilation to
babel, allowing for better tooling integration from the wider javascript community.
This is just a heads up to the possibility, not a definitive recommendation. Both
`flow` and `typescript` have their relative pros and cons.
