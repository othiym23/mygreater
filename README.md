I've written this framework in about five different languages, but Node is the
first environment that takes separation of concerns to be the default position.

If you have a set of tasks that need to be applied to something, once, with
(perhaps optionally?) dependencies between the tasks that imply an order in
which they should be applied, this should be a suitable tool for the job. Its
most obvious application is managing schema and data migrations for databases,
but it's written to be simple and modular enough to work well to be generally
useful for making idempotent, (optionally) reversible changes to data.
