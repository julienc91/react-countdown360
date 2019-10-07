# Changelog

## 1.0.0 - 07/10/2019

Complete refactoring. The `canvas` solution used by `jquery.countdown360` has been replaced with a full-CSS
implementation. Many fixes for bugs that were _imported_ from the original repo.

New:

* it is now possible to pause and resume
* you can customize the border color with the props `borderFillColor` and `borderUnfillColor`

Fixes:

* fixed issues when starting and stopping multiple times and too quickly
* fixed implementations of `start` and `stop` that would break if the countdown was already started/stopped
* fixed implementations of `extendTimer` and `addSeconds` that would break with some values

Breaking:

* some props were renamed:
  * `autostart` &rarr; `autoStart`
  * `fillStyle` &rarr; `backgroundColor`
  * `label` &rarr; `unit`
  * `strokeStyle` &rarr; `borderFillColor`
  * `strokeWidth` &rarr; `borderWidth`
* the `radius` parameter was removed in favor of a new `width` parameter
* the `startOverAfterAdding` parameter was removed


## 0.1.0 - 03/10/2019 (unreleased)

First version.
This is basically a copy and paste of the original `jquery.countdown360` plugin with React in place of jquery.
