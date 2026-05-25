# Ewoks Oscars

Ewoks Oscars is a demonstration project for running
[ewoks](https://ewoks.readthedocs.io/) workflows from both the command line and
a web GUI.

The project is meant to grow into a small, presentation-friendly showcase:

- define or reuse ewoks workflows;
- execute workflows from Python or from a terminal;
- inspect, edit, save, and run workflows in a browser;
- discover available ewoks tasks from Python packages.

## What is ewoks?

ewoks is a workflow system for composing tasks into executable graphs. A
workflow can be stored as a JSON graph, executed programmatically, executed from
the command line, or opened in the web editor.

Useful references:

- [ewoks documentation](https://ewoks.readthedocs.io/)
- [ewokscore workflow specification](https://ewokscore.readthedocs.io/en/stable/reference/specs.html)
- [ewoks task catalog](https://ewoks.esrf.fr/en/latest/tasks/index.html)
- [ewoksweb documentation](https://ewoksweb.readthedocs.io/)

## Run a workflow from Python

Install the ewoks runtime:

```bash
pip install ewoks
```

Execute a workflow graph:

```python
from ewokscore import execute_graph

result = execute_graph("/path/to/graph.json")
```

## Run a workflow from the command line

Use `ewoks execute` to run a workflow directly from a terminal:

```bash
ewoks execute results/workflow1.json --outputs=end --merge-outputs
```

The example above executes `results/workflow1.json`, collects the `end` output,
and merges the output values into the command result.

## Discover available tasks

ewoks tasks can be discovered from one or more Python modules:

```python
from ewokscore.task_discovery import discover_tasks_from_modules

tasks = discover_tasks_from_modules(
    "myproject.module1",
    "myproject.module2",
    task_type="class",
)
```

The `task_type` argument controls how tasks are discovered:

- `class`: the module defines ewoks task classes, or imports modules that define
  ewoks task classes.
- `method`: public module methods are treated as ewoks tasks.
- `ppfmethod`: the module's `run` method is treated as an ewoks task.

To discover tasks from all installed Python packages that expose ewoks entry
points:

```python
from ewokscore.task_discovery import discover_all_tasks

tasks = discover_all_tasks(task_type="class")
```

Packages that provide ewoks tasks should declare their task modules through
Python entry points:

```ini
# setup.cfg

[options.entry_points]
ewoks.tasks.class =
    myproject.module1.submoduleA = myproject1
    myproject.*.tasks = myproject2
ewoks.tasks.method =
    myproject.module3.submodule = myproject3
ewoks.tasks.ppfmethod =
    myproject.actors.* = myproject4
```

Supported entry point groups are:

- `ewoks.tasks.class`
- `ewoks.tasks.method`
- `ewoks.tasks.ppfmethod`

The entry point keys are the modules where ewoks should look for tasks. Entry
point values are ignored by ewoks, but they must be globally unique because of
how Python entry points work. Module names can contain `*` wildcards.

To make a task package easier to find in package repositories such as PyPI, add
the `ewoks` keyword to the package metadata:

```ini
# setup.cfg

[metadata]
name = myproject
keywords = ewoks
```

## Run the web GUI

Install `ewoksweb`, the ewoks workflow web editor:

```bash
pip install ewoksweb
```

Start the full application, including the web frontend and REST server:

```bash
ewoksweb --port 5174
```

The default port is `8000`. When the app starts, it prints information similar
to:

```text
RESOURCE DIRECTORY: /path/to/resource/directory
EWOKS JOB SCHEDULING: Local workflow execution
EWOKS EXECUTION: {...}
Uvicorn running on http://127.0.0.1:5174 (Press CTRL+C to quit)
```

`RESOURCE DIRECTORY` is where workflows are saved. `EWOKS EXECUTION` describes
where execution events are stored.

Once the server is running, open the printed local URL in a browser to create,
edit, save, and execute workflows from the GUI.

## Convert workflow formats

To inspect or modify a workflow as JSON, convert it with `ewoks convert`:

```bash
ewoks convert demo demo.json --test
```

## Documentation

- [ewoks](https://ewoks.readthedocs.io/)
- [ewokscore workflow specification](https://ewokscore.readthedocs.io/en/stable/reference/specs.html)
- [ewoksweb](https://ewoksweb.readthedocs.io/)
