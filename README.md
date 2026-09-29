# EVERYTHING ON DATABRICKS
### From absolute basics → everyday engineering → advanced architecture, with two worked Medallion projects

> **How to read this guide**
> * **Level 1 – Basics (Chapters 1–8):** what Databricks is, why it exists, the workspace, notebooks, compute, storage.
> * **Level 2 – Core engineering (Chapters 9–15):** Apache Spark, Delta Lake, Medallion architecture, ingestion, streaming, pipelines, jobs.
> * **Level 3 – Platform & advanced (Chapters 16–23):** Unity Catalog governance, Databricks SQL/BI, ML & GenAI, performance tuning, cost, security, CI/CD.
> * **Level 4 – Apply it (Chapters 24–27):** how the two assignments in this folder are built, 150+ interview Q&As, cheat sheets, certification path.
>
> Every chapter starts with a one-paragraph **"In plain English"** summary. If you only read those, you'll still understand the platform end to end.
>
> Product names change fast at Databricks. Where a feature was recently renamed, both names are given
> (e.g. *Delta Live Tables → Lakeflow Declarative Pipelines*, *Workflows → Lakeflow Jobs*). Interviewers accept either.

---

## Table of contents

**Level 1 – Basics**
1. The problem Databricks solves (warehouse vs lake vs lakehouse)
2. What Databricks is (company, platform, clouds)
3. Platform architecture: account, workspace, control plane, compute plane
4. Core vocabulary (glossary you must know)
5. Getting started & tour of the workspace UI
6. Notebooks, magic commands, `dbutils`, widgets
7. Compute: clusters, SQL warehouses, serverless, runtimes, Photon
8. Storage: cloud object storage, DBFS (legacy), Volumes, managed vs external tables

**Level 2 – Core engineering**
9. Apache Spark architecture (driver, executors, jobs, stages, tasks, partitions, shuffle)
10. DataFrames & Spark SQL in practice
11. How Spark executes your code: lazy evaluation, Catalyst, Tungsten, AQE, Photon
12. Delta Lake in depth
13. Medallion architecture (Bronze → Silver → Gold) in depth
14. Ingestion: Auto Loader, COPY INTO, Lakeflow Connect, Structured Streaming
15. Lakeflow Declarative Pipelines (DLT) and Lakeflow Jobs (Workflows)

**Level 3 – Platform & advanced**
16. Unity Catalog & governance
17. Databricks SQL, AI/BI dashboards, Genie
18. Machine learning on Databricks (MLflow, Feature Store, AutoML, Model Serving)
19. Generative AI on Databricks (Mosaic AI, Vector Search, Agents, AI Functions)
20. Performance tuning (the Spark UI, skew, spills, file layout)
21. Cost management (DBUs, serverless, policies, system tables)
22. Security & administration
23. DevOps: Git folders, Asset Bundles, CI/CD, CLI/SDK/REST, Databricks Connect, testing

**Level 4 – Apply it**
24. How the two assignments are built (walk-through + how to run on Databricks)
25. Interview questions & answers (basic → advanced → scenario)
26. Cheat sheets
27. Certifications & learning path

---

# LEVEL 1 — BASICS

## 1. The problem Databricks solves

**In plain English:** Companies have two kinds of data platforms. *Data warehouses* are fast and reliable for SQL reports but expensive and bad at raw or unstructured data. *Data lakes* are cheap and hold anything, but they easily turn into a messy "data swamp" with no reliability. Databricks invented the **Lakehouse**: keep all data cheaply in a lake, and add a transaction layer (**Delta Lake**) on top so it behaves like a warehouse.

### 1.1 The evolution

| Era | Technology | Strengths | Weaknesses |
|---|---|---|---|
| 1990s–2000s | **Data warehouse** (Teradata, Oracle, later Snowflake/Redshift/BigQuery) | Fast SQL, ACID transactions, governance, BI-friendly | Costly storage, proprietary format, structured data only, weak for ML/streaming |
| 2010s | **Data lake** (HDFS, then S3 / ADLS / GCS + Hadoop/Spark) | Cheap, any format (CSV, JSON, images, logs), great for ML | No transactions, no schema enforcement, no updates/deletes, slow small files, "data swamp" |
| 2010s workaround | **Two-tier architecture**: lake + warehouse | Each tool for its job | Data copied twice, stale, two security models, double cost |
| 2020+ | **Lakehouse** (Databricks + Delta Lake, also Iceberg/Hudi) | One copy of data in open formats on cheap storage, with ACID, schemas, time travel, fine-grained governance, serving BI + ML + streaming | Needs a good engine and governance layer, which is Databricks' job |

### 1.2 Lakehouse in one picture

```
            BI / SQL        Data Science / ML      Streaming apps       GenAI agents
                \                 |                     |                   /
                 \________________|_____________________|__________________/
                                  |
                   Unity Catalog  (one governance layer: permissions, lineage, audit)
                                  |
                   Engines: Spark · Photon · Databricks SQL · Serverless
                                  |
                   Delta Lake / Iceberg  (open table format = Parquet files + transaction log)
                                  |
                   Cloud object storage: AWS S3 · Azure ADLS Gen2 · Google GCS   (cheap, durable, yours)
```

Key idea: **the data stays in *your* cloud storage in open formats** (Parquet + Delta/Iceberg metadata). Databricks provides the compute and management on top. You're not locked into a proprietary storage format.

---

## 2. What Databricks is

**In plain English:** Databricks is a cloud "Data Intelligence Platform" where data engineers, analysts, data scientists, and ML/AI engineers work on the same data using notebooks, SQL, pipelines, and ML tools. It's built by the people who created Apache Spark.

* **Founded:** 2013 by the creators of **Apache Spark** (UC Berkeley AMPLab), including Ali Ghodsi and Matei Zaharia.
* **Open-source projects it created or leads:** Apache Spark, **Delta Lake**, **MLflow**, **Unity Catalog** (open-sourced 2024), **Delta Sharing**, Spark Declarative Pipelines.
* **Runs on:** AWS, Microsoft Azure (as the first-party "Azure Databricks" service), and Google Cloud.
* **Who uses it for what:**

| Persona | Uses |
|---|---|
| Data engineer | Ingestion, ETL/ELT pipelines, streaming, Medallion layers, orchestration |
| Data analyst / BI | Databricks SQL, dashboards, Genie (natural-language questions), Power BI/Tableau connections |
| Data scientist | Notebooks, pandas/Spark, feature engineering, AutoML, MLflow experiments |
| ML engineer | Model registry, model serving, monitoring, feature serving, batch inference |
| GenAI engineer | Vector Search, RAG, agents, LLM serving, evaluation |
| Platform admin | Workspaces, identity, Unity Catalog, cost controls, networking |

* **Business model:** you pay Databricks in **DBUs** (Databricks Units, a normalised unit of compute per hour) and, for classic compute, you *also* pay your cloud provider for the VMs. With **serverless**, one Databricks bill covers both.

---

## 3. Platform architecture

**In plain English:** Databricks has two halves. The **control plane** is Databricks' own backend: the web UI, notebooks, job scheduler, and cluster manager. The **compute plane** is where your data is actually processed, either in *your* cloud account (classic) or in Databricks-managed compute (serverless). Your data lives in your cloud storage.

```
┌────────────────────────── Databricks ACCOUNT (billing, users, metastores, workspaces) ─────────────────────────┐
│                                                                                                               │
│   ┌──────────── CONTROL PLANE (Databricks-managed) ────────────┐                                             │
│   │ Web app / UI · Notebooks · Jobs scheduler · Cluster manager │                                             │
│   │ Unity Catalog service · Query history · REST APIs           │                                             │
│   └───────────────┬─────────────────────────────┬───────────────┘                                             │
│                   │                             │                                                             │
│   ┌───────────────▼──────────────┐   ┌──────────▼──────────────────────┐                                     │
│   │ CLASSIC COMPUTE PLANE         │   │ SERVERLESS COMPUTE PLANE         │                                     │
│   │ VMs in *your* cloud account / │   │ Compute in Databricks' account,  │                                     │
│   │ VNet/VPC (clusters, classic   │   │ instant start, auto-managed      │                                     │
│   │ SQL warehouses)               │   │ (serverless SQL, notebooks, jobs)│                                     │
│   └───────────────┬──────────────┘   └──────────┬──────────────────────┘                                     │
│                   └──────────────┬──────────────┘                                                             │
│                        ┌─────────▼──────────┐                                                                 │
│                        │ YOUR cloud storage │  S3 / ADLS / GCS — Delta tables, Volumes, logs                  │
│                        └────────────────────┘                                                                 │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| Concept | Meaning |
|---|---|
| **Account** | Top level. Holds users/groups/service principals, billing, Unity Catalog metastores, and one or more workspaces. Managed in the *account console*. |
| **Workspace** | An environment (URL like `adb-123.azuredatabricks.net`) where teams work: notebooks, jobs, compute, dashboards. Companies often have dev / staging / prod workspaces. |
| **Metastore** | Unity Catalog's top-level container of metadata, **one per cloud region**, attached to many workspaces. |
| **Control plane** | Databricks' backend services. Holds notebook source, job definitions, and query history, not your table data. |
| **Compute plane** | Where Spark / SQL actually runs. Classic runs in your account; serverless runs in Databricks' account. |

---

## 4. Core vocabulary

| Term | One-line definition |
|---|---|
| **Lakehouse** | Architecture combining lake storage with warehouse reliability via an open table format. |
| **Delta Lake** | Open table format: Parquet data files + a `_delta_log` transaction log → ACID, time travel, MERGE, schema enforcement. |
| **Apache Spark** | Distributed processing engine (Python/SQL/Scala/R) that Databricks runs. |
| **Photon** | Databricks' native C++ vectorised engine that runs Spark SQL/DataFrame operations much faster. |
| **Databricks Runtime (DBR)** | The versioned software image on a cluster: Spark + Delta + libraries + optimisations. "ML Runtime" adds ML libraries. |
| **Cluster / compute** | A set of VMs (1 driver + N workers) running Spark. |
| **SQL warehouse** | Compute optimised for SQL/BI queries (serverless, pro, or classic). |
| **Serverless** | Databricks-managed compute that starts in seconds; you don't size VMs. |
| **DBU** | Databricks Unit, the billing unit of processing capability per hour. |
| **Notebook** | Interactive document with cells of Python/SQL/Scala/R/Markdown. |
| **Unity Catalog (UC)** | Unified governance: `catalog.schema.table` namespace, permissions, lineage, audit, sharing. |
| **Catalog / Schema / Table** | Three-level namespace: `catalog` (e.g. `logistics`) → `schema` (a.k.a. database, e.g. `silver`) → `table`. |
| **Volume** | UC object for governed *files* (CSV, images, JARs): `/Volumes/catalog/schema/volume/…`. |
| **Managed vs external table** | Managed: UC controls location & lifecycle (DROP deletes data). External: you give the path (DROP keeps files). |
| **Medallion architecture** | Bronze (raw) → Silver (clean) → Gold (business) data layering pattern. |
| **Auto Loader** | `cloudFiles` source that incrementally ingests new files with schema inference/evolution. |
| **Structured Streaming** | Spark's streaming engine: treat a stream as an unbounded table. |
| **Lakeflow Declarative Pipelines (DLT)** | Declarative framework: define tables + data-quality *expectations*; Databricks manages orchestration, retries, lineage. |
| **Lakeflow Jobs (Workflows)** | Orchestrator for tasks (notebooks, SQL, pipelines, Python wheels, dbt) with schedules/triggers. |
| **Lakeflow Connect** | Managed ingestion connectors (Salesforce, SQL Server, Workday, SharePoint …). |
| **MLflow** | Open-source platform for experiment tracking, model packaging, registry, and evaluation (incl. GenAI). |
| **Model Serving** | REST endpoints for models/LLMs/agents with autoscaling. |
| **Mosaic AI** | Databricks' umbrella brand for ML/GenAI tools (serving, vector search, agent framework, AI gateway, training). |
| **Delta Sharing** | Open protocol to share live tables with other orgs/platforms without copying. |
| **Lakehouse Federation** | Query external databases (Postgres, Snowflake, BigQuery…) from Databricks without moving data. |
| **Asset Bundles (DABs)** | Infrastructure-as-code (YAML) for deploying jobs, pipelines, and notebooks via CI/CD. |
| **Git folders (Repos)** | Git integration inside the workspace. |
| **Genie** | Natural-language-to-SQL "talk to your data" spaces for business users. |
| **Lakebase** | Managed Postgres (OLTP) database integrated with the lakehouse (2025+). |
| **Databricks Apps** | Host data/AI web apps (Streamlit, Dash, Gradio, React…) inside Databricks. |

---

## 5. Getting started & tour of the workspace

**In plain English:** Sign up (the free edition is enough to learn), open a workspace, and you'll see a left sidebar with everything: workspace files, data catalog, compute, jobs, SQL, dashboards, and ML.

### 5.1 Ways to get a workspace
* **Databricks Free Edition** (2025+, replaced the old Community Edition): free, serverless-only, great for learning SQL, notebooks, pipelines, and dashboards. Limited compute and some enterprise features unavailable.
* **14-day free trial** on AWS/Azure/GCP: full features, you pay the cloud provider after credits.
* **Company workspace**: what you'll use at work.

### 5.2 Sidebar tour

| Sidebar item | What you do there |
|---|---|
| **Workspace** | Folders of notebooks, files, Git folders. `/Users/<you>` is your home; `/Shared` for teams. |
| **Recents / Search** | Find anything (tables, notebooks, dashboards). |
| **Catalog (Catalog Explorer)** | Browse catalogs → schemas → tables/volumes/models; see schema, sample data, lineage, permissions, history. Upload files. |
| **Jobs & Pipelines (Workflows)** | Create/monitor Lakeflow Jobs and Declarative Pipelines; run history, repair failed runs. |
| **Compute** | Create/manage all-purpose clusters, job compute, SQL warehouses, pools, policies. |
| **Marketplace** | Get free/paid datasets, models, and solution accelerators (via Delta Sharing). |
| **SQL Editor / Queries** | Write SQL against SQL warehouses; save queries; schedule. |
| **Dashboards (AI/BI)** | Build dashboards from SQL datasets; share with business users. |
| **Genie** | Natural-language Q&A spaces over curated tables. |
| **Alerts** | Notify when a query result crosses a threshold. |
| **Query history** | Every SQL query, its duration, and query profile (performance). |
| **Experiments** | MLflow experiment runs, metrics, and artifacts. |
| **Features** | Feature tables (Feature Engineering in UC). |
| **Models** | Registered models (in Unity Catalog). |
| **Serving** | Model Serving endpoints, foundation models, AI Gateway. |
| **Playground** | Chat with LLMs and prototype agents with tools. |
| **Apps** | Databricks Apps. |
| **Databricks Assistant** | Built-in AI assistant (generate/explain/fix code and SQL) in notebooks and the SQL editor. |

### 5.3 Your first 10 minutes (hands-on)
1. **Compute →** use *Serverless* (Free Edition) or create a small cluster (single node, latest LTS runtime, auto-terminate 30 min).
2. **Catalog → Create catalog** `learn` → **Create schema** `bronze` → **Create volume** `landing`.
3. Upload a CSV to the volume (drag & drop).
4. **Workspace → Create → Notebook**, attach compute, run:

```python
df = spark.read.option("header", True).csv("/Volumes/learn/bronze/landing/routes.csv")
display(df)                                        # interactive table + charts
df.write.saveAsTable("learn.bronze.routes")        # a managed Delta table
```
```sql
%sql
SELECT origin_state, count(*) FROM learn.bronze.routes GROUP BY ALL ORDER BY 2 DESC
```

---

## 6. Notebooks, magic commands, `dbutils`, widgets

**In plain English:** A notebook is a page of runnable cells. Each cell can use a different language by starting with a *magic command* (`%sql`, `%python` …). `dbutils` is a helper library for files, secrets, parameters, and chaining notebooks.

### 6.1 Notebook basics
* Default language set per notebook (Python/SQL/Scala/R); override per cell with a magic.
* **`spark`** (SparkSession) and **`dbutils`** are pre-created. **`display(df)`** renders sortable tables and built-in charts.
* Cells share state within the same language. Across languages, share data via **temp views** or tables (`df.createOrReplaceTempView("v")` then `%sql SELECT * FROM v`), or use `_sqldf` (the result of the last `%sql` cell, available in Python).
* Collaboration: real-time co-editing, comments, revision history, and the Databricks Assistant.
* Notebooks can be exported as `.py` "source" files (like the ones in this project). `# COMMAND ----------` separates cells and `# MAGIC` prefixes non-Python cells.
* **IPython kernel** features: `%pip install`, `%load_ext autoreload` (for editing modules), variable explorer, debugger.

### 6.2 Magic commands

| Magic | Purpose | Example |
|---|---|---|
| `%python`, `%sql`, `%scala`, `%r` | Change cell language | `%sql SELECT 1` |
| `%md` | Markdown documentation cell | `%md ## Title` |
| `%run ./other_notebook` | Execute another notebook **inline** (shares variables/functions) | `%run ../_common` |
| `%pip install pkg` | Notebook-scoped Python library (restarts Python) | `%pip install xgboost` |
| `%sh` | Shell command on the **driver** | `%sh ls /tmp` |
| `%fs` | Shorthand for `dbutils.fs` | `%fs ls /Volumes/learn/bronze/landing` |
| `%restart_python` / `dbutils.library.restartPython()` | Restart Python after installs | |

### 6.3 `dbutils` essentials

```python
dbutils.fs.ls("/Volumes/logistics/raw/landing")          # list files
dbutils.fs.cp(src, dst, recurse=True); dbutils.fs.rm(path, recurse=True); dbutils.fs.mkdirs(path)
dbutils.fs.head("/Volumes/.../routes.csv")                # first bytes of a file

dbutils.secrets.get(scope="kv", key="db-password")        # secrets are redacted in output
dbutils.secrets.listScopes()

dbutils.widgets.text("catalog", "logistics", "Catalog")   # notebook parameters
dbutils.widgets.dropdown("env", "dev", ["dev", "prod"])
catalog = dbutils.widgets.get("catalog")

result = dbutils.notebook.run("./child", timeout_seconds=600, arguments={"date": "2024-01-01"})
dbutils.notebook.exit("OK")                               # return a value to caller / job

dbutils.jobs.taskValues.set(key="row_count", value=123)   # pass values between job tasks
dbutils.jobs.taskValues.get(taskKey="ingest", key="row_count")
```

**`%run` vs `dbutils.notebook.run()`**:

| | `%run` | `dbutils.notebook.run()` |
|---|---|---|
| Runs in | Same context (shares variables/functions) | A *separate* ephemeral job |
| Parameters | No (uses caller's variables) | Yes (`arguments={}`, read with widgets) |
| Return value | N/A | String via `dbutils.notebook.exit()` |
| Use for | Shared setup/helper functions | Modular, parameterised, parallelisable child runs |

### 6.4 Widgets = notebook parameters
Widgets appear at the top of the notebook. When a notebook runs as a **job task**, the task's parameters fill the widgets. That's how one notebook runs in dev and prod with different catalogs. SQL can reference them as `:param` (named parameter markers), e.g. `SELECT * FROM IDENTIFIER(:catalog || '.gold.kpi_customer')`.

---

## 7. Compute

**In plain English:** Compute is the "engine" that runs your code. You choose between **clusters** (for notebooks and jobs), **SQL warehouses** (for SQL/BI), and **serverless** versions of both, where Databricks manages the machines. Prefer serverless unless you need something it doesn't support.

### 7.1 Types of compute

| Compute | Used by | Billing / lifecycle | Notes |
|---|---|---|---|
| **Serverless compute for notebooks & jobs** | Notebooks, Lakeflow Jobs, pipelines | Starts in seconds, auto-scales, per-use | No cluster config; Python/SQL only; some low-level configs & RDD APIs unsupported |
| **All-purpose (interactive) cluster** | Humans working in notebooks | Runs until auto-termination; higher DBU rate | Shareable by several users |
| **Job compute (job cluster)** | Scheduled jobs | Created for the run and terminated after; cheaper DBU rate | Best practice for production classic jobs |
| **SQL warehouse – Serverless** | SQL editor, dashboards, BI tools, dbt | Instant start, auto-stop, Photon + IWM | Recommended for BI |
| **SQL warehouse – Pro / Classic** | Same | Runs in your cloud account; slower start | Pro supports more features (e.g. federation, ML functions) |
| **Instance pools** | Clusters | Keep idle VMs warm to cut start time | Classic only |

### 7.2 Cluster anatomy & options
* **Driver node**: runs your notebook's main program and the Spark driver. **Worker nodes** run executors, which run tasks.
* **Single-node cluster**: driver only, good for small data and ML with pandas/scikit-learn.
* **Autoscaling**: min/max workers; Databricks adds or removes workers with load. Enhanced autoscaling exists for pipelines.
* **Auto-termination**: stop after N idle minutes (always set it!).
* **Spot / preemptible instances**: much cheaper; use for workers with fallback to on-demand. Keep the driver on-demand.
* **Instance types**: memory-optimised (joins/caching), compute-optimised (CPU-heavy transforms), storage-optimised (disk cache/Delta), GPU (deep learning).
* **Databricks Runtime (DBR)**: choose an **LTS** (long-term support) version for production. **ML Runtime** adds PyTorch, TensorFlow, XGBoost, scikit-learn, MLflow, Hugging Face. GPU ML runtime adds CUDA.
* **Photon**: toggle on for SQL/DataFrame-heavy workloads (on by default for SQL warehouses).
* **Access mode** (security model; required for Unity Catalog):

| Access mode (new name / old name) | Who | Notes |
|---|---|---|
| **Standard** / Shared | Many users, isolated from each other | UC-enforced fine-grained security; Python/SQL/Scala; some restrictions (e.g. no direct RDD/`sparkContext` in some versions) |
| **Dedicated** / Single user | One user or one group | Full feature support incl. ML runtime, RDDs, GPU |
| No isolation shared (legacy) | Not UC-compliant | Avoid |

* **Cluster policies**: admin-defined templates that restrict or fix settings (max workers, instance types, mandatory tags, auto-termination) → governance + cost control.
* **Libraries**: install from PyPI/Maven/Volumes/wheel at cluster level, notebook level (`%pip`), or via job/serverless *environments*.
* **Init scripts**: shell scripts that run at node start (store them in Volumes or workspace files).
* **Spark config & env vars**: e.g. `spark.sql.shuffle.partitions`.

### 7.3 Which compute when?

| Situation | Choose |
|---|---|
| Learning / ad-hoc notebook work | Serverless notebook compute (or small all-purpose cluster with auto-termination) |
| Production ETL job | Serverless jobs, or a **job cluster** (never an all-purpose cluster → ~2× cost) |
| BI dashboards, analysts, Power BI | **Serverless SQL warehouse** |
| Deep learning training | Dedicated GPU cluster with ML Runtime |
| Streaming 24/7 | Job cluster or pipeline with enhanced autoscaling, or serverless pipelines |
| Many small jobs start-up-time sensitive | Serverless, or instance pools on classic |

---

## 8. Storage: object storage, DBFS, Volumes, tables

**In plain English:** All data physically lives as files in cloud object storage (S3/ADLS/GCS). Unity Catalog decides *who can access what*: **tables** for structured data and **Volumes** for arbitrary files. The old DBFS root and mounts are legacy; don't use them for new work.

### 8.1 The layers of storage

| Concept | What it is | Status |
|---|---|---|
| **Cloud object storage** | S3 bucket / ADLS container / GCS bucket where Parquet and Delta files live | Foundation |
| **DBFS** (Databricks File System) | Virtual file system abstraction (`dbfs:/`) including the workspace "DBFS root" | **Legacy** for data; don't store production data in the DBFS root |
| **Mounts** (`/mnt/...`) | Old way to map cloud storage into DBFS with shared credentials | **Deprecated**, replaced by UC external locations + Volumes |
| **Storage credential** (UC) | A cloud identity (IAM role / managed identity / service account) that can access storage | Current |
| **External location** (UC) | A cloud path + a storage credential; permissioned with `READ FILES` / `WRITE FILES` / `CREATE EXTERNAL TABLE` | Current |
| **Managed storage location** | Where UC stores *managed* tables/volumes for a metastore, catalog, or schema | Current |
| **Volume** (UC) | Governed folder for non-tabular files: `/Volumes/<catalog>/<schema>/<volume>/path` | **Use this for raw files** |
| **Workspace files** | Files next to notebooks (small configs, `.py` modules, requirements) | Current |

### 8.2 Managed vs external tables

| | **Managed table** | **External table** |
|---|---|---|
| Create | `CREATE TABLE cat.sch.t (...)` or `df.write.saveAsTable()` | `CREATE TABLE ... LOCATION 'abfss://...'` |
| Data location | UC-managed storage | A path you choose (inside an external location) |
| `DROP TABLE` | Deletes metadata **and** data (recoverable with `UNDROP` for 7 days) | Deletes metadata only; files stay |
| Optimisation | Eligible for **predictive optimization** (auto OPTIMIZE/VACUUM/ANALYZE), faster metadata | You manage maintenance |
| Recommendation | **Default choice** | When other tools must write/read the same path, or legacy data |

Same for volumes: **managed volume** (UC-owned storage) vs **external volume** (existing cloud path).

### 8.3 File formats you'll meet

| Format | Type | Use |
|---|---|---|
| CSV / JSON | Row, text | Raw landing (Bronze input); slow, no schema |
| **Parquet** | Columnar, compressed | Analytical storage; the physical format under Delta |
| **Delta** | Parquet + transaction log | **Default table format on Databricks** |
| **Iceberg** | Parquet + metadata tree | Open table format; supported via UniForm / managed Iceberg tables |
| Avro | Row, binary with schema | Kafka messages, CDC |
| ORC | Columnar | Hive legacy |
| Binary / images / PDF | Unstructured | ML / GenAI (store in Volumes) |



---

# LEVEL 2 — CORE ENGINEERING

## 9. Apache Spark architecture

**In plain English:** Spark splits a big dataset into many small pieces (**partitions**) and processes them in parallel on many machines. One **driver** plans the work; many **executors** do it. Anything that forces data to move between machines (a **shuffle**) is expensive.

### 9.1 The components

```
                    ┌──────────────────── DRIVER (1) ─────────────────────┐
  your notebook ──► │ SparkSession · builds logical plan · Catalyst        │
                    │ optimiser · DAG scheduler splits JOB → STAGES → TASKS│
                    └───────┬───────────────────┬──────────────────┬──────┘
                            │ tasks             │                  │
                ┌───────────▼─────┐   ┌─────────▼───────┐   ┌──────▼──────────┐
                │ EXECUTOR (JVM)  │   │ EXECUTOR        │   │ EXECUTOR        │
                │ cores = slots   │   │ 1 task per core │   │ memory + disk   │
                │ [task][task]    │   │ [task][task]    │   │ cache           │
                └─────────────────┘   └─────────────────┘   └─────────────────┘
```

| Term | Meaning |
|---|---|
| **Driver** | The process running your main program: creates the SparkSession, plans queries, schedules tasks, collects results. Too much `collect()` → driver out-of-memory. |
| **Executor** | A JVM process on a worker node that runs tasks and stores cached data. |
| **Core / slot** | One task runs per core at a time. Total parallelism = total executor cores. |
| **Partition** | A chunk of the data. **One task processes one partition.** |
| **Job** | Triggered by one **action** (e.g. `count()`, `write`, `display`). |
| **Stage** | A set of tasks that can run without a shuffle. A new stage starts at every shuffle boundary. |
| **Task** | The unit of work: one stage applied to one partition. |
| **DAG** | Directed acyclic graph of stages that Spark builds from your code. |
| **Shuffle** | Redistributing data across executors by key (for `groupBy`, `join`, `distinct`, `orderBy`, `repartition`). It writes to disk and goes over the network, so it's the #1 cost. |

### 9.2 Transformations vs actions, narrow vs wide
* **Transformations** (lazy, return a new DataFrame): `select`, `filter`, `withColumn`, `join`, `groupBy().agg()`.
* **Actions** (trigger execution): `count`, `show`, `display`, `collect`, `take`, `write`, `save`, `toPandas`.
* **Narrow transformation**: each output partition depends on one input partition (`filter`, `select`, `withColumn`), so there's no shuffle.
* **Wide transformation**: needs data from many partitions (`groupBy`, `join` (non-broadcast), `distinct`, `orderBy`, `repartition`), so it shuffles.

### 9.3 Partitions in practice
* When reading files, input partitions are about `spark.sql.files.maxPartitionBytes` (default 128 MB).
* After a shuffle, the count is `spark.sql.shuffle.partitions` (default 200). **AQE** (on by default) coalesces them automatically.
* `repartition(n, col)`: full shuffle to exactly n partitions (can increase). `coalesce(n)`: merges partitions without a shuffle (only decreases).
* Rule of thumb: aim for partitions of **~100–200 MB** and **at least 2–3× as many tasks as cores**.

### 9.4 Memory basics
Executor memory is split into **execution** (shuffles, joins, sorts, aggregations) and **storage** (cache), which share a unified region. When execution memory runs out, Spark **spills** to disk (slow). Symptoms and fixes are in Chapter 20.

---

## 10. DataFrames & Spark SQL in practice

**In plain English:** A DataFrame is a distributed table. You can manipulate it with Python methods (PySpark) or with SQL. Both compile to the *same* optimised plan, so pick whichever reads better.

### 10.1 Reading & writing

```python
# Read
df = (spark.read.format("csv").option("header", True).option("inferSchema", True)
      .load("/Volumes/logistics/raw/landing/trips.csv"))
df = spark.read.json("/Volumes/.../events/")              # folder of JSON files
df = spark.read.table("logistics.silver.trips")           # a UC table
df = spark.sql("SELECT * FROM logistics.gold.fact_trip WHERE dispatch_month = '2024-01-01'")

# Explicit schema (faster + safer than inferSchema)
schema = "trip_id STRING, dispatch_date DATE, actual_distance_miles INT, average_mpg DOUBLE"
df = spark.read.schema(schema).option("header", True).csv(path)

# Write
df.write.mode("overwrite").saveAsTable("logistics.silver.trips")          # managed Delta table
df.write.mode("append").partitionBy("dispatch_month").saveAsTable(...)
df.write.format("delta").mode("overwrite").option("replaceWhere", "dispatch_month = '2024-01-01'").saveAsTable(...)
```

Save modes: `append`, `overwrite`, `error`/`errorifexists` (default), `ignore`.

### 10.2 The operations you use every day (PySpark ↔ SQL)

```python
from pyspark.sql import functions as F, Window

(df.select("trip_id", "driver_id", F.col("actual_distance_miles").alias("miles"))
   .filter((F.col("miles") > 100) & F.col("driver_id").isNotNull())
   .withColumn("revenue_per_mile", F.round(F.col("revenue") / F.col("miles"), 2))
   .withColumn("haul", F.when(F.col("miles") < 250, "short").otherwise("long"))
   .groupBy("driver_id").agg(F.count("*").alias("trips"), F.sum("miles").alias("miles"),
                             F.avg("average_mpg").alias("avg_mpg"))
   .orderBy(F.desc("miles")))
```
```sql
SELECT driver_id, count(*) AS trips, sum(actual_distance_miles) AS miles, avg(average_mpg) AS avg_mpg
FROM logistics.silver.trips
WHERE actual_distance_miles > 100 AND driver_id IS NOT NULL
GROUP BY ALL                 -- Databricks SQL: group by every non-aggregated column
ORDER BY miles DESC;
```

**Joins:** `inner`, `left`, `right`, `full`, `left_semi` (exists), `left_anti` (not exists), `cross`.
```python
trips.join(loads, "load_id", "inner")
trips.join(F.broadcast(routes), "route_id")               # force broadcast of a small table
orders.join(customers, "customer_id", "left_anti")        # orders with no matching customer
```

**Window functions** (ranking, running totals, lag/lead, de-duplication):
```python
w = Window.partitionBy("driver_id").orderBy(F.desc("dispatch_date"))
latest = df.withColumn("rn", F.row_number().over(w)).filter("rn = 1")            # dedupe / latest record
running = df.withColumn("cum_rev", F.sum("revenue").over(
    Window.partitionBy("customer_id").orderBy("load_date").rowsBetween(Window.unboundedPreceding, 0)))
prev = df.withColumn("prev_mpg", F.lag("average_mpg").over(Window.partitionBy("truck_id").orderBy("dispatch_date")))
rolling_7d = df.withColumn("vib_7d", F.avg("vibration").over(
    Window.partitionBy("machineID").orderBy(F.col("datetime").cast("long")).rangeBetween(-7*86400, 0)))
```

**Nulls, types, dates:**
```python
F.coalesce("driver_id", F.lit("UNKNOWN")); df.na.fill({"qty": 0}); df.dropna(subset=["id"])
F.expr("try_cast(amount AS DECIMAL(12,2))")     # NULL instead of error on bad values
F.to_date("d", "yyyy-MM-dd"); F.date_trunc("month", "ts"); F.datediff("end", "start"); F.months_between(a, b)
```

**Semi-structured data:**
```python
F.from_json("payload", "id STRING, items ARRAY<STRUCT<sku STRING, qty INT>>")
df.select(F.explode("items").alias("item"))     # one row per array element
df.select("payload:customer.id")                 # SQL path syntax on JSON strings / VARIANT
```
Databricks also has a **VARIANT** type for fast semi-structured JSON (`parse_json(col)`, `col:field::int`).

### 10.3 UDFs: when and which

| Option | Speed | Use |
|---|---|---|
| Built-in functions (`F.*`, SQL functions) | Fastest (JVM/Photon) | **Always first choice** |
| SQL UDF (`CREATE FUNCTION ... RETURN expr`) | Fast (inlined) | Reusable SQL logic, governed in UC |
| **Pandas UDF** (`@pandas_udf`) / `applyInPandas` / `mapInPandas` | Good (Arrow, vectorised) | Custom Python/ML logic, per-group model training |
| Python UDF (`@udf`) | Slowest (row by row, serialisation) | Last resort |
| Python UDTF (table function) | Row-producing functions | Explode custom logic |

```python
from pyspark.sql.functions import pandas_udf
@pandas_udf("double")
def zscore(v: pd.Series) -> pd.Series:
    return (v - v.mean()) / v.std()

# train one model per machine model, in parallel across the cluster
def train(pdf: pd.DataFrame) -> pd.DataFrame: ...
df.groupBy("model").applyInPandas(train, schema="model string, score double")
```

### 10.4 pandas on Databricks
* `df.toPandas()` pulls all data to the driver. Only use it for small results.
* **pandas API on Spark** (`import pyspark.pandas as ps`) gives pandas syntax with distributed execution.
* Arrow is enabled by default for fast Spark↔pandas conversion.

### 10.5 Temp views, caching
* `df.createOrReplaceTempView("v")` is session-scoped; `createOrReplaceGlobalTempView` is cluster-scoped (`global_temp.v`).
* `df.cache()` / `persist()` keeps a DataFrame in executor memory for reuse (it materialises on the first action). `unpersist()` when done.
* The **Databricks disk cache** (a.k.a. Delta cache) automatically caches remote Parquet/Delta files on local SSDs. Prefer it over manual `cache()` for table reads.

---

## 11. How Spark executes your code

**In plain English:** Spark doesn't run your lines one by one. It records what you want (lazy), rewrites the whole thing into the most efficient plan (Catalyst), runs it with fast memory tricks (Tungsten), keeps adjusting the plan while running (AQE), and on Databricks can hand it to a native C++ engine (Photon).

```
Your code (SQL / DataFrame)
   ↓  parse
Unresolved logical plan  →  analysis (resolve tables/columns via catalog)  →  Logical plan
   ↓  Catalyst optimiser: predicate pushdown, column pruning, constant folding, join reordering
Optimised logical plan
   ↓  physical planning (choose join strategy: broadcast hash / sort-merge / shuffle hash)
Physical plan  →  whole-stage code generation (Tungsten)  →  RDD tasks on executors
   ↑  AQE re-optimises between stages using real runtime statistics
```

* **Lazy evaluation** lets Spark see the full pipeline before running, so it can optimise across steps.
* **Catalyst** does rule- and cost-based optimisation:
  * *Predicate pushdown*: filters are pushed to the file scan and only matching files/row groups are read.
  * *Column pruning*: only the columns you need are read (a columnar-format benefit).
* **Tungsten** gives off-heap binary memory format and whole-stage code generation (fuses operators into one JVM function).
* **Adaptive Query Execution (AQE)** is on by default:
  1. It coalesces small shuffle partitions.
  2. It switches sort-merge join → broadcast join if one side turns out small.
  3. It splits skewed partitions in joins.
* **Photon** is Databricks' vectorised native engine (C++) and a drop-in replacement for many operators. Typically 2–10× faster for SQL/DataFrame workloads (joins, aggregations, Delta writes). Python UDFs and RDD code don't benefit.
* Inspect plans with `df.explain(mode="formatted")` or `EXPLAIN FORMATTED SELECT ...`. Look for `BroadcastHashJoin` vs `SortMergeJoin`, `PushedFilters`, and `Exchange` (= shuffle).

**Join strategies**

| Strategy | When | Cost |
|---|---|---|
| **Broadcast hash join** | One side small (< `spark.sql.autoBroadcastJoinThreshold`, 10 MB default; AQE can go higher) | No shuffle of the big side, so the fastest |
| **Shuffle hash join** | Medium side fits in memory per partition | One shuffle |
| **Sort-merge join** | Both sides large (default for big-big) | Shuffle + sort both sides |
| Broadcast nested loop / cartesian | Non-equi joins / cross joins | Very expensive |

---

## 12. Delta Lake in depth

**In plain English:** A Delta table is a folder of Parquet files plus a `_delta_log` folder that records every change as a numbered JSON "commit". Because every reader and writer goes through that log, you get database-style transactions, rollbacks, updates/deletes/merges, and the ability to query the table as it was yesterday, all on cheap object storage.

### 12.1 How it works

```
logistics/silver/trips/
├── part-00000-...snappy.parquet         ← data files (immutable; never edited in place)
├── part-00001-...snappy.parquet
└── _delta_log/
    ├── 00000000000000000000.json        ← commit 0: add files, schema, protocol
    ├── 00000000000000000001.json        ← commit 1: add/remove files (an UPDATE rewrote some files)
    ├── ...
    └── 00000000000000000010.checkpoint.parquet   ← periodic snapshot of the log for fast reads
```

* **ACID transactions** use *optimistic concurrency control*. A writer reads the latest version, writes new files, then atomically commits version N+1. If someone else committed a conflicting change first, it retries or fails.
* **Updates/deletes** are *copy-on-write* (rewrite affected files). With **deletion vectors** (default on new tables), they're *merge-on-read*: rows are marked deleted in a small bitmap instead of rewriting files, which makes DELETE/UPDATE/MERGE much faster.
* **Readers** always see a consistent snapshot (snapshot isolation). Writes are serialisable per table.

### 12.2 Feature tour with SQL

```sql
-- Create (managed Delta by default in Unity Catalog)
CREATE TABLE logistics.silver.trips (
  trip_id STRING NOT NULL, dispatch_date DATE, miles INT, mpg DOUBLE,
  trip_year INT GENERATED ALWAYS AS (year(dispatch_date)),       -- generated column
  row_id BIGINT GENERATED ALWAYS AS IDENTITY,                     -- surrogate key
  CONSTRAINT miles_positive CHECK (miles > 0)                     -- enforced on every write
) CLUSTER BY (dispatch_date)                                      -- liquid clustering
  COMMENT 'Cleaned trips';

-- DML
INSERT INTO t VALUES (...);  UPDATE t SET mpg = NULL WHERE mpg > 20;  DELETE FROM t WHERE trip_id IS NULL;

-- UPSERT / CDC: the most important Delta command
MERGE INTO silver.customers AS t
USING updates AS s ON t.customer_id = s.customer_id
WHEN MATCHED AND s.op = 'DELETE' THEN DELETE
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
WHEN NOT MATCHED BY SOURCE THEN DELETE;     -- rows missing from a full snapshot

-- History & time travel
DESCRIBE HISTORY silver.trips;                               -- who/what/when for every version
SELECT * FROM silver.trips VERSION AS OF 12;
SELECT * FROM silver.trips TIMESTAMP AS OF '2025-01-01';
RESTORE TABLE silver.trips TO VERSION AS OF 12;              -- undo a bad load

-- Maintenance
OPTIMIZE silver.trips;                                       -- compact small files (~1 GB target)
OPTIMIZE silver.trips ZORDER BY (driver_id);                 -- legacy multi-dim clustering
VACUUM silver.trips RETAIN 168 HOURS;                        -- delete unreferenced files older than 7 days
ANALYZE TABLE silver.trips COMPUTE STATISTICS FOR ALL COLUMNS;

-- Metadata
DESCRIBE DETAIL silver.trips;        -- location, numFiles, sizeInBytes, clustering
SHOW TBLPROPERTIES silver.trips;
ALTER TABLE silver.trips SET TBLPROPERTIES (delta.enableChangeDataFeed = true);

-- Change Data Feed (row-level changes between versions)
SELECT * FROM table_changes('silver.trips', 5);   -- _change_type: insert/update_preimage/update_postimage/delete

-- Clone
CREATE TABLE dev.silver.trips SHALLOW CLONE prod.silver.trips;   -- metadata-only copy for testing
CREATE TABLE backup.trips DEEP CLONE prod.silver.trips;          -- full copy of files
```

### 12.3 Key features explained

| Feature | What it gives you |
|---|---|
| **Schema enforcement** | Writes with wrong columns/types are rejected, so no silent corruption. |
| **Schema evolution** | `.option("mergeSchema", "true")` or `ALTER TABLE ADD COLUMNS`. MERGE supports `WITH SCHEMA EVOLUTION`. |
| **Time travel** | Query/restore older versions (limited by `VACUUM` retention; default log retention 30 days). |
| **MERGE** | Upserts, SCD Type 1/2, CDC apply, de-dup inserts. |
| **Change Data Feed (CDF)** | Downstream jobs process only changed rows (incremental Silver→Gold). |
| **OPTIMIZE / bin-packing** | Fixes the *small-file problem*. |
| **Data skipping** | Delta stores min/max stats per file for the first 32 columns; filters skip irrelevant files. |
| **Z-ORDER** | Co-locates related values across multiple columns so data skipping works better (legacy; needs re-running). |
| **Liquid clustering** (`CLUSTER BY`) | Replaces partitioning + Z-ORDER. Incremental, keys can be changed any time, handles skew. `CLUSTER BY AUTO` lets Databricks pick keys from query patterns. **Recommended for new tables.** |
| **Partitioning** (`PARTITIONED BY`) | Folder per value. Only useful for very large tables (> 1 TB) with a low-cardinality filter column; over-partitioning creates small files. |
| **Deletion vectors** | Fast deletes/updates/merges without rewriting files. |
| **Constraints** | `NOT NULL`, `CHECK` enforced. `PRIMARY KEY` / `FOREIGN KEY` informational in UC (used by BI tools and the optimiser with `RELY`). |
| **Generated / identity columns** | Derived columns and auto-incrementing surrogate keys. |
| **VACUUM** | Removes old files to save storage. Time travel beyond the retention period is lost. |
| **Predictive optimization** | For UC managed tables, Databricks automatically runs OPTIMIZE, VACUUM, and ANALYZE when useful. |
| **UniForm** | Writes Iceberg (and Hudi) metadata alongside Delta, so Iceberg clients (Snowflake, Trino, BigQuery) can read the same table. |
| **Row tracking, type widening, VARIANT, collations** | Newer Delta features (Delta 3.x/4.x). |

### 12.4 Concurrency & isolation
* Default isolation for writes: **WriteSerializable**. Readers get **snapshot isolation**.
* Conflicts (`ConcurrentAppendException`, `ConcurrentDeleteReadException`…) happen when two writers touch the same files. Fix by making writers touch disjoint data (explicit partition/clustering predicates in MERGE conditions) or by using row-level concurrency (with deletion vectors + liquid clustering).

---

## 13. Medallion architecture in depth

**In plain English:** Medallion is a way to organise the lakehouse into three quality levels. **Bronze** = exactly what arrived (the raw copy). **Silver** = cleaned, typed, de-duplicated, validated truth. **Gold** = business-ready tables shaped for specific questions (star schemas, KPIs, features). Each layer is built only from the layer before it.

```
 SOURCES            BRONZE (raw)                 SILVER (clean/conformed)             GOLD (business)
 ─────────          ─────────────────────        ──────────────────────────           ───────────────────────────
 CSV / JSON  ──►    • as-is, append-only    ──►  • correct data types          ──►    • star schema (facts/dims)
 DB CDC             • all columns STRING or      • de-duplicated                      • aggregated KPI marts
 Kafka              raw schema                   • validated (DQ rules)               • ML feature tables
 APIs               • + _ingest_ts,              • quarantine bad rows                • served to BI / ML / apps
 IoT                  _source_file               • conformed keys & codes             • optimised for reads
                    • full history, replayable   • SCD / MERGE upserts                  (clustering, MVs)
                    • restricted access          • enterprise "single version         • broad read access
                                                   of truth"
```

### 13.1 Layer rules

| | **Bronze** | **Silver** | **Gold** |
|---|---|---|---|
| Purpose | Raw history, replay, audit | Trusted, reusable entity data | Answer business questions fast |
| Transformations | None (only metadata columns; maybe parse JSON) | Cast, clean, dedupe, standardise, validate, join reference data, SCD | Aggregate, model (Kimball), denormalise, compute KPIs & features |
| Schema | Source schema / strings / `_rescued_data` | Enforced, typed | Business-named columns, documented |
| Write pattern | Append (Auto Loader / COPY INTO) | MERGE / upsert, streaming | Overwrite/refresh, materialized views, MERGE |
| Consumers | Data engineers | Engineers, data scientists | Analysts, BI, execs, ML, apps |
| Quality | Whatever arrived | DQ rules enforced (+ quarantine) | Business rules + reconciliation |
| Typical UC layout | `catalog.bronze.*` | `catalog.silver.*` | `catalog.gold.*` |

Common UC layouts:
* One catalog per environment (`dev`, `prod`) and schemas per layer (`prod.bronze`, `prod.silver`, `prod.gold`), **or**
* One catalog per domain/project (`logistics`, `pdm`) and schemas per layer. That's what this project uses, with a `catalog` widget so dev/prod can differ.

### 13.2 Why bother (interview answer)
1. **Replayability**: if Silver logic has a bug, rebuild from Bronze; no need to re-extract from sources.
2. **Separation of concerns**: ingestion failures, cleaning logic, and business logic are isolated.
3. **Data quality is progressive and measurable**: DQ scorecards per layer.
4. **Governance**: restrict Bronze (may contain PII/raw), open Gold widely.
5. **Performance**: Gold is pre-aggregated and clustered for BI.
6. **Reusability**: many Gold marts reuse the same Silver entities.

### 13.3 Data quality patterns
* **Validate → route**: rows failing *critical* rules go to a `quarantine_<table>` with the reasons; rows failing *warning* rules are kept with a `_dq_warnings` array. (Used in this project's Silver notebooks.)
* **Declarative expectations** in pipelines: `@dp.expect`, `expect_or_drop`, `expect_or_fail` (Chapter 15).
* **Referential integrity**: orphan checks via left-anti joins. Assign an `UNKNOWN` dimension member so facts still join (Kimball).
* **Reconciliation**: compare Gold totals to source-system reports (done for driver on-time rate in the logistics project).
* **Monitoring**: Lakehouse Monitoring (data profiles & drift), Lakeflow pipeline event logs, alerts.

### 13.4 Slowly Changing Dimensions (SCD)
* **Type 1**: overwrite (no history). `MERGE ... WHEN MATCHED THEN UPDATE SET *`.
* **Type 2**: keep history with `valid_from`, `valid_to`, `is_current`. Close the old row and insert a new one.

```sql
-- SCD2 with MERGE (classic trick: stage changed rows twice — once to close, once to insert)
MERGE INTO gold.dim_customer t
USING (
  SELECT s.customer_id AS merge_key, s.* FROM staged s
  UNION ALL
  SELECT NULL AS merge_key, s.* FROM staged s
  JOIN gold.dim_customer t ON s.customer_id = t.customer_id AND t.is_current
  WHERE s.customer_type <> t.customer_type           -- attribute changed
) s
ON t.customer_id = s.merge_key AND t.is_current
WHEN MATCHED AND s.customer_type <> t.customer_type THEN
  UPDATE SET is_current = false, valid_to = current_timestamp()
WHEN NOT MATCHED THEN
  INSERT (customer_id, customer_type, valid_from, valid_to, is_current)
  VALUES (s.customer_id, s.customer_type, current_timestamp(), NULL, true);
```
In Lakeflow Declarative Pipelines this is a single statement: `AUTO CDC ... STORED AS SCD TYPE 2` (formerly `APPLY CHANGES INTO`).

### 13.5 Gold modelling: Kimball star schema
* **Fact tables** hold measures at a declared **grain** ("one row per trip"). Additive measures (revenue, miles) are summed; ratios (MPG, on-time %) are *recomputed* from their components, never averaged.
* **Dimension tables** hold descriptive attributes (driver, truck, route, date). Use surrogate keys for SCD2, plus an `UNKNOWN` member.
* **Date dimension**: year, quarter, month, week, weekday, season, holidays.
* **Aggregate / KPI marts**: pre-computed answers for dashboards.
* **One Big Table (OBT)**: a fully denormalised wide table. Simple for BI/ML, but duplicates attributes.
* **Data Vault** (hubs/links/satellites) is sometimes used in Silver for enterprise integration.

### 13.6 Medallion anti-patterns
* Doing business logic in Bronze, or reading sources directly into Gold.
* A copy per layer with no transformation ("three layers because the slide said so").
* Averaging averages in Gold (e.g. mean of per-trip MPG instead of total miles ÷ total gallons).
* Over-partitioning small tables → thousands of tiny files.
* No DQ metrics, so nobody knows if Silver is actually trustworthy.

---

## 14. Ingestion: Auto Loader, COPY INTO, Lakeflow Connect, Structured Streaming

**In plain English:** To bring data in, you can load files once (batch), load only new files incrementally (**Auto Loader** / **COPY INTO**), pull from SaaS apps and databases with managed connectors (**Lakeflow Connect**), or process never-ending event streams (**Structured Streaming** from Kafka/Event Hubs/Kinesis).

### 14.1 Options compared

| Method | Best for | Incremental? | Notes |
|---|---|---|---|
| `spark.read` batch | One-off / small full reloads | No | Simple |
| **COPY INTO** (SQL) | Thousands of files, SQL users, idempotent loads | Yes (tracks loaded files) | Re-running skips already-loaded files |
| **Auto Loader** (`cloudFiles`) | Millions of files, continuous or scheduled, schema drift | Yes (checkpoint) | Directory listing or file-notification mode; schema inference & evolution; `_rescued_data` |
| **Lakeflow Connect** | Salesforce, Workday, ServiceNow, SQL Server, Postgres/MySQL CDC, SharePoint, GA4 … | Yes (managed CDC) | UI-driven, serverless, writes streaming tables |
| **Structured Streaming** | Kafka, Event Hubs, Kinesis, Pub/Sub, Delta tables | Yes | Low-latency event processing |
| **Lakehouse Federation** | Query external DBs in place | N/A | No copy; good for exploration or small dims |
| Partner tools (Fivetran, Airbyte, ADF, dbt) | Existing enterprise tooling | Yes | Via Partner Connect |

### 14.2 Auto Loader

```python
(spark.readStream.format("cloudFiles")
   .option("cloudFiles.format", "json")
   .option("cloudFiles.schemaLocation", "/Volumes/cat/raw/_schemas/orders")   # inferred schema stored here
   .option("cloudFiles.inferColumnTypes", "true")
   .option("cloudFiles.schemaEvolutionMode", "addNewColumns")                # or rescue / failOnNewColumns / none
   .load("/Volumes/cat/raw/landing/orders/")
   .withColumn("_ingest_ts", F.current_timestamp())
   .withColumn("_source_file", F.col("_metadata.file_path"))
 .writeStream
   .option("checkpointLocation", "/Volumes/cat/raw/_checkpoints/orders")      # exactly-once bookkeeping
   .trigger(availableNow=True)                                              # batch-style: process new files then stop
   .toTable("cat.bronze.orders"))
```
* **Schema evolution modes**:
  * `addNewColumns` (default): the stream fails once on a new column, then restarts with the evolved schema.
  * `rescue`: unknown data goes into `_rescued_data`.
  * `failOnNewColumns`, `none`.
* **File discovery**: directory listing (default, simple) or **file notification** (cloud queue events; for huge directories). Newer runtimes offer *managed file events*.
* The **checkpoint** remembers processed files. Delete it and everything is re-ingested.

### 14.3 Structured Streaming fundamentals
* Model: a stream is an **unbounded table**; each micro-batch appends rows; your query runs incrementally.
* **Sources**: Kafka, Event Hubs (Kafka API), Kinesis, Auto Loader, Delta tables (`spark.readStream.table("t")`), rate (testing).
* **Sinks**: Delta tables, Kafka, `foreachBatch` (arbitrary batch code per micro-batch, e.g. MERGE), console/memory for testing.
* **Triggers**:

| Trigger | Behaviour |
|---|---|
| default / `processingTime="1 minute"` | Continuous micro-batches at that interval |
| `availableNow=True` | Process all available data in batches, then stop (**cost-efficient incremental batch**) |
| `once=True` | Legacy single batch (use availableNow) |
| Real-time mode / continuous | Ultra-low latency (ms) for specific use cases |

* **Output modes**: `append` (new rows only), `update` (changed aggregates), `complete` (whole result).
* **Checkpointing + idempotent sinks** give **exactly-once** end-to-end for Delta sinks.
* **Stateful operations** (aggregations, joins, dedupe) keep state in a state store (RocksDB recommended). **Watermarks** bound state by telling Spark how late data can arrive:

```python
(events.withWatermark("event_time", "10 minutes")
       .groupBy(F.window("event_time", "5 minutes"), "machine_id")
       .agg(F.avg("vibration").alias("avg_vib")))
events.withWatermark("ts", "1 hour").dropDuplicatesWithinWatermark(["event_id"])
```
* **Stream-static join**: enrich a stream with a Delta dimension table (re-read each micro-batch). **Stream-stream join** needs watermarks on both sides.
* **`foreachBatch` MERGE pattern** (upsert streaming CDC into Silver):
```python
def upsert(batch_df, batch_id):
    batch_df.createOrReplaceTempView("updates")
    batch_df.sparkSession.sql("""MERGE INTO silver.customers t USING updates s
        ON t.customer_id = s.customer_id WHEN MATCHED THEN UPDATE SET * WHEN NOT MATCHED THEN INSERT *""")
stream.writeStream.foreachBatch(upsert).option("checkpointLocation", ckpt).start()
```
* Monitoring: `query.lastProgress`, the streaming tab in the Spark UI, and the metrics `inputRowsPerSecond` vs `processedRowsPerSecond` (falling behind?).

---

## 15. Lakeflow Declarative Pipelines (DLT) and Lakeflow Jobs

**In plain English:** Instead of writing *how* to load each table (read, write, checkpoint, retry, order), **Declarative Pipelines** let you declare *what* each table should contain. Databricks figures out dependencies, runs them in order, handles streaming checkpoints and retries, enforces data-quality expectations, and shows lineage. **Lakeflow Jobs** is the scheduler/orchestrator that runs notebooks, pipelines, SQL, dbt, and more as multi-task workflows.

### 15.1 Declarative Pipelines concepts

| Object | Meaning |
|---|---|
| **Streaming table** | Incrementally processes append-only / streaming sources (each input row processed once). Ideal for Bronze and Silver. |
| **Materialized view (MV)** | Result of a query, kept up to date. Incremental refresh where possible, otherwise recompute. Ideal for Gold aggregates. |
| **View / temporary view** | Intermediate logic, not persisted. |
| **Expectation** | Data-quality rule: `expect` (warn, keep row), `expect_or_drop` (drop row), `expect_or_fail` (stop update). Metrics appear in the pipeline UI & event log. |
| **Flow** | A write into a target. Multiple flows can append into one streaming table. |
| **AUTO CDC** (formerly `APPLY CHANGES INTO`) | Apply CDC feeds with out-of-order handling; SCD Type 1 or 2 in one statement. |
| **Pipeline modes** | *Triggered* (run then stop) vs *Continuous*; *Development* (reuse compute, no retries) vs *Production*. |
| **Event log** | Queryable table of pipeline events, DQ metrics, lineage. |

Python (new `pyspark.pipelines` API; `import dlt` with `@dlt.table` still works):

```python
from pyspark import pipelines as dp
from pyspark.sql import functions as F

@dp.table(comment="Raw trips from landing volume")
def bronze_trips():
    return (spark.readStream.format("cloudFiles").option("cloudFiles.format", "csv")
            .option("header", True).load("/Volumes/logistics/raw/landing/trips/"))

@dp.table(comment="Clean trips")
@dp.expect_or_drop("positive_distance", "actual_distance_miles > 0")
@dp.expect("has_driver", "driver_id IS NOT NULL")
def silver_trips():
    return (spark.readStream.table("bronze_trips")
            .select("trip_id", "driver_id", F.col("actual_distance_miles").cast("int"), ...))

@dp.materialized_view(comment="Driver KPIs")
def gold_driver_kpis():
    return spark.read.table("silver_trips").groupBy("driver_id").agg(F.sum("actual_distance_miles").alias("miles"))
```

SQL:
```sql
CREATE OR REFRESH STREAMING TABLE bronze_loads
AS SELECT *, _metadata.file_path AS _source_file
   FROM STREAM read_files('/Volumes/logistics/raw/landing/loads/', format => 'csv', header => true);

CREATE OR REFRESH STREAMING TABLE silver_loads (
  CONSTRAINT revenue_ok EXPECT (revenue >= 0) ON VIOLATION DROP ROW,
  CONSTRAINT has_customer EXPECT (customer_id IS NOT NULL)
) AS SELECT load_id, customer_id, CAST(revenue AS DECIMAL(12,2)) AS revenue FROM STREAM(bronze_loads);

CREATE OR REFRESH MATERIALIZED VIEW gold_customer_revenue
AS SELECT customer_id, sum(revenue) AS revenue FROM silver_loads GROUP BY customer_id;

-- CDC → SCD Type 2 dimension
CREATE OR REFRESH STREAMING TABLE dim_customer;
CREATE FLOW customer_cdc AS AUTO CDC INTO dim_customer
FROM STREAM(bronze_customer_cdc)
KEYS (customer_id) APPLY AS DELETE WHEN op = 'D'
SEQUENCE BY event_ts STORED AS SCD TYPE 2;
```

This project includes a full declarative version of the logistics Medallion pipeline: `pipelines/logistics_declarative_pipeline.py`.

### 15.2 Lakeflow Jobs (Workflows)

| Concept | Details |
|---|---|
| **Job** | A DAG of **tasks** with shared parameters, compute, notifications, permissions. |
| **Task types** | Notebook, Python script, Python wheel, JAR, SQL (query/file/dashboard/alert), **Pipeline**, dbt, Run Job (call another job), **If/else condition**, **For each** (loop over inputs), Clean Room notebooks, Power BI refresh. |
| **Dependencies** | `depends_on` + "Run if": all succeeded / at least one succeeded / all done / none failed … |
| **Triggers** | Scheduled (cron), **file arrival**, **table update** (run when upstream table changes), continuous, manual/API. |
| **Parameters** | Job parameters + task parameters + dynamic values (`{{job.start_time.iso_date}}`, `{{tasks.ingest.values.row_count}}`). Task values let tasks pass small results. |
| **Compute** | Serverless, job clusters (can be shared across tasks), or existing clusters (not recommended for prod). |
| **Reliability** | Retries per task, timeouts, **repair run** (re-run only failed tasks and their dependants), max concurrent runs, queueing. |
| **Observability** | Run history, Gantt/timeline, email/Slack/webhook notifications, duration SLA warnings, `system.lakeflow` system tables. |
| **Deployment** | UI, JSON via REST/CLI, **Asset Bundles (YAML)**, Terraform. |

Example: the orchestration for this project, as a bundle job (see `databricks.yml` in the project):

```
logistics_medallion_job
  ├── bronze_ingest          (notebook 01)            trigger: file arrival on /Volumes/logistics/raw/landing
  ├── silver_clean           (notebook 02) depends_on bronze_ingest
  ├── gold_model             (notebook 03) depends_on silver_clean
  └── gold_kpis              (notebook 04) depends_on gold_model  → refresh dashboard task
```

**Declarative Pipelines vs Jobs + notebooks, when to use which**

| Use Declarative Pipelines when… | Use Jobs + notebooks when… |
|---|---|
| Building standard ingest → clean → aggregate pipelines | Complex procedural logic, ML training, external API calls |
| You want automatic dependency management, checkpoints, DQ expectations, lineage | You need full control over the Spark code and write patterns |
| Streaming + CDC/SCD2 | One-off / irregular tasks |
| You want less code to maintain | Orchestrating *many* things incl. pipelines themselves |

(Jobs usually orchestrate pipelines, so they are complementary.)


---

# LEVEL 3 — PLATFORM & ADVANCED

## 16. Unity Catalog & governance

**In plain English:** Unity Catalog (UC) is the "security guard + librarian" for everything in Databricks. It keeps one catalogue of all tables, files, models, and functions across all workspaces. It decides who can see what (down to rows and columns), records who accessed what (audit), and draws lineage graphs showing where each column came from.

### 16.1 Object model

```
METASTORE (one per region, attached to workspaces)
 └── CATALOG            e.g. logistics, pdm, prod, dev
      └── SCHEMA        e.g. bronze, silver, gold, ml
           ├── TABLE    (managed / external; Delta or Iceberg)   → logistics.gold.fact_trip
           ├── VIEW / MATERIALIZED VIEW / STREAMING TABLE / METRIC VIEW
           ├── VOLUME   (governed files)                         → /Volumes/logistics/raw/landing
           ├── FUNCTION (SQL/Python UDFs, also used as agent tools)
           └── MODEL    (registered ML models)                   → pdm.ml.failure_classifier
Also at metastore level: STORAGE CREDENTIALS, EXTERNAL LOCATIONS, CONNECTIONS (federation),
SHARES / RECIPIENTS / PROVIDERS (Delta Sharing), CLEAN ROOMS
```

Three-level names: `catalog.schema.object`. `USE CATALOG logistics; USE SCHEMA gold;` sets defaults.
Legacy per-workspace **Hive metastore** tables appear as the `hive_metastore` catalog. Migrate them with `SYNC` / UCX.

### 16.2 Permissions

```sql
GRANT USE CATALOG ON CATALOG logistics TO `analysts`;
GRANT USE SCHEMA, SELECT ON SCHEMA logistics.gold TO `analysts`;      -- inherited by all tables in gold
GRANT MODIFY ON TABLE logistics.silver.trips TO `data_engineers`;
GRANT READ VOLUME, WRITE VOLUME ON VOLUME logistics.raw.landing TO `ingest_sp`;
GRANT EXECUTE ON FUNCTION logistics.gold.mask_email TO `analysts`;
REVOKE SELECT ON SCHEMA logistics.bronze FROM `analysts`;
SHOW GRANTS ON SCHEMA logistics.gold;
ALTER TABLE logistics.gold.fact_trip OWNER TO `data_platform_team`;
```

* **Securable hierarchy + inheritance**: grants on a catalog/schema flow down to child objects.
* To read a table you need `USE CATALOG` + `USE SCHEMA` + `SELECT`.
* **Owners** have all privileges and can grant. Assign ownership to **groups**, not individuals.
* Key privileges: `USE CATALOG`, `USE SCHEMA`, `SELECT`, `MODIFY`, `CREATE TABLE`, `CREATE SCHEMA`, `READ/WRITE VOLUME`, `EXECUTE`, `MANAGE`, `ALL PRIVILEGES`, `BROWSE` (see metadata without data access).
* **Workspace-catalog binding**: restrict a catalog to certain workspaces (e.g. `prod` catalog only in the prod workspace).

### 16.3 Fine-grained access control

```sql
-- Row filter: EU analysts only see EU rows
CREATE FUNCTION gov.region_filter(region STRING)
RETURN is_account_group_member('admins') OR (is_account_group_member('eu_analysts') AND region = 'EU');
ALTER TABLE sales.gold.orders SET ROW FILTER gov.region_filter ON (region);

-- Column mask: hide licence numbers unless in HR
CREATE FUNCTION gov.mask_license(v STRING)
RETURN CASE WHEN is_account_group_member('hr') THEN v ELSE concat('****', right(v, 4)) END;
ALTER TABLE logistics.silver.drivers ALTER COLUMN license_number SET MASK gov.mask_license;

-- Dynamic view (older pattern)
CREATE VIEW gold.v_drivers AS
SELECT driver_id, CASE WHEN is_account_group_member('hr') THEN date_of_birth END AS date_of_birth FROM silver.drivers;
```
**ABAC (attribute-based access control)**: tag columns (e.g. `pii = email`), then define policies once that apply to every tagged column/table.

### 16.4 Discovery, lineage, audit, system tables
* **Catalog Explorer**: search, descriptions (AI-generated comments), tags, sample data, history.
* **Lineage**: table- and **column-level**, captured automatically for SQL/DataFrame queries, jobs, notebooks, dashboards, models. It answers "if I change `silver.trips`, what breaks?"
* **Tags & comments**: `ALTER TABLE t SET TAGS ('domain' = 'logistics', 'pii' = 'false')`, `COMMENT ON COLUMN ...`.
* **`information_schema`** in every catalog: tables, columns, privileges, constraints.
* **System tables** (`system.*` catalog): queryable operational data.

| System table | Tells you |
|---|---|
| `system.billing.usage`, `system.billing.list_prices` | DBU consumption & cost by workspace, job, cluster, user, tag |
| `system.access.audit` | Who did what (logins, queries, grants, downloads) |
| `system.access.table_lineage`, `column_lineage` | Lineage graph as data |
| `system.compute.clusters`, `warehouse_events`, `node_timeline` | Compute config and utilisation |
| `system.lakeflow.jobs`, `job_run_timeline`, `job_task_run_timeline` | Job runs, durations, failures |
| `system.query.history` | SQL warehouse / serverless query history |
| `system.storage.predictive_optimization_operations_history` | Auto maintenance actions |

### 16.5 Sharing & federation
* **Delta Sharing**: share live tables, views, volumes, models, notebooks with another Databricks account (*Databricks-to-Databricks*) or any client (Pandas, Power BI, Spark, Snowflake…) via the *open* protocol. No data copy; the recipient reads directly with short-lived credentials. Objects: **share** (what), **recipient** (who), **provider**.
* **Marketplace**: public or private data/model exchange built on Delta Sharing.
* **Clean Rooms**: two or more parties run approved code on joined data without seeing each other's raw data.
* **Lakehouse Federation**: `CREATE CONNECTION` + `CREATE FOREIGN CATALOG` to query PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery, Redshift, Oracle, Teradata … in place, with UC permissions. Catalog federation also covers external Hive/Glue metastores.

---

## 17. Databricks SQL, AI/BI dashboards, Genie

**In plain English:** Databricks SQL (DBSQL) is the data-warehouse experience of the Lakehouse: SQL warehouses for compute, a SQL editor, dashboards, alerts, and connectors for BI tools. **Genie** lets business users ask questions in plain English and get SQL-backed answers.

### 17.1 Components

| Component | Purpose |
|---|---|
| **SQL warehouse** | SQL compute (serverless recommended). Sizes 2X-Small → 4X-Large (cluster size) + min/max clusters for concurrency scaling. Auto-stop. Photon + Intelligent Workload Management. |
| **SQL editor** | Tabs, autocomplete, Assistant, parameters, visualisations, query history, **query profile** (graphical plan with time per operator). |
| **AI/BI Dashboards** (formerly Lakeview) | Drag-and-drop dashboards on SQL datasets, filters, cross-filtering, scheduled PDF/email, embed, share with users who have no workspace access. |
| **Genie spaces** | Curated set of tables + instructions + example SQL. Business users ask questions in natural language and get answers, charts, and the SQL used. |
| **Alerts** | Run a query on a schedule and notify when a condition is met (e.g. on-time rate < 90%). |
| **Metric views** | Define governed business metrics (measures + dimensions) once in UC and reuse them everywhere. |
| **Materialized views / streaming tables in DBSQL** | Create pipeline-backed objects from the SQL editor with scheduled refresh. |
| **Connectors** | JDBC/ODBC, Power BI (DirectQuery / import, publish-to-Power BI), Tableau, Looker, Excel, dbt, Python SQL connector. |
| **SQL scripting & procedures** | `BEGIN … END` blocks, variables (`DECLARE`), loops, IF, stored procedures. |

### 17.2 Useful Databricks SQL features
```sql
SELECT * EXCEPT (_ingest_ts, _source_file) FROM silver.trips;          -- exclude columns
SELECT driver_id, sum(miles) FROM gold.fact_trip GROUP BY ALL;         -- GROUP BY ALL
SELECT * FROM gold.kpi_customer QUALIFY rank() OVER (PARTITION BY customer_type ORDER BY revenue DESC) <= 3;
SELECT * FROM read_files('/Volumes/logistics/raw/landing/routes.csv', format => 'csv', header => true);
SELECT max_by(driver_id, miles), min_by(route_id, margin_pct) FROM ...;
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY mpg) FROM gold.fact_trip;
SELECT * FROM IDENTIFIER(:catalog || '.gold.kpi_customer');          -- parameterised object names
DECLARE VARIABLE target DOUBLE DEFAULT 0.9; SET VAR target = 0.95;
-- pipe syntax (newer)
FROM gold.fact_trip |> WHERE miles > 500 |> AGGREGATE sum(total_revenue) AS rev GROUP BY route_id;
```

**AI Functions** (call LLMs from SQL, great for batch GenAI):
```sql
SELECT description,
       ai_classify(description, ARRAY('weather', 'equipment', 'traffic', 'other driver')) AS cause,
       ai_analyze_sentiment(review) AS sentiment,
       ai_summarize(notes, 20) AS summary,
       ai_extract(text, ARRAY('city', 'date')) AS entities,
       ai_query('databricks-meta-llama-3-3-70b-instruct', concat('Explain this incident: ', description)) AS llm_answer
FROM logistics.silver.safety_incidents;
```
Also `ai_forecast()` (time-series forecasting in SQL), `ai_parse_document()` (PDF/image → structured text), `vector_search()`, `ai_mask()`, `ai_translate()`, `ai_fix_grammar()`, `ai_gen()`.

---

## 18. Machine learning on Databricks

**In plain English:** Databricks covers the whole ML lifecycle on the same governed data. You build features in Delta tables, train models in notebooks (scikit-learn, XGBoost, Spark ML, PyTorch), track every experiment with **MLflow**, register the best model in **Unity Catalog**, deploy it as a real-time endpoint or run batch predictions, and monitor it for drift.

### 18.1 The lifecycle and the tool for each step

```
Data (Delta, Medallion) → Features (Feature Engineering in UC) → Train (ML Runtime, AutoML, Spark ML, TorchDistributor, Ray)
    → Track (MLflow experiments: params, metrics, artifacts, models) → Register (UC model registry: versions + aliases)
    → Deploy (Model Serving endpoint | batch inference in a job | ai_query from SQL | streaming)
    → Monitor (Lakehouse Monitoring / inference tables: data drift, model quality) → Retrain (Jobs)
```

### 18.2 MLflow

| Component | What it does |
|---|---|
| **Tracking** | Log parameters, metrics, tags, artifacts (plots, files) and models per *run*; runs grouped into *experiments*. |
| **Autologging** | `mlflow.autolog()` automatically logs scikit-learn, XGBoost, LightGBM, Spark ML, PyTorch Lightning, TensorFlow … (on by default in Databricks notebooks). |
| **Models** | Standard packaging ("flavors": sklearn, pyfunc, spark, pytorch, transformers…) with a signature (input/output schema) and dependencies. |
| **Model Registry in UC** | `catalog.schema.model` with versions, **aliases** (`@champion`, `@challenger`) instead of the old Staging/Production stages, lineage to training data, permissions. |
| **Evaluation** | `mlflow.evaluate()` / MLflow 3 GenAI evaluation with LLM judges (for agents and RAG). |
| **Tracing** | Traces for LLM/agent calls (inputs, outputs, latency, token usage). |

```python
import mlflow
from sklearn.ensemble import RandomForestClassifier
mlflow.set_registry_uri("databricks-uc")
mlflow.set_experiment("/Users/me/pdm_failure")

with mlflow.start_run(run_name="rf_baseline") as run:
    model = RandomForestClassifier(n_estimators=300, max_depth=8).fit(X_train, y_train)
    mlflow.log_params({"n_estimators": 300, "max_depth": 8})
    mlflow.log_metric("auc", roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]))
    mlflow.sklearn.log_model(model, name="model", input_example=X_train[:5],
                             registered_model_name="pdm.ml.failure_classifier")

from mlflow import MlflowClient
MlflowClient().set_registered_model_alias("pdm.ml.failure_classifier", "champion", version=3)

# batch scoring anywhere in Spark
predict = mlflow.pyfunc.spark_udf(spark, "models:/pdm.ml.failure_classifier@champion")
scored = features.withColumn("risk", predict(*feature_cols))
```

### 18.3 Other ML building blocks

| Tool | Use |
|---|---|
| **ML Runtime** | Pre-installed ML libraries + GPU drivers. |
| **Feature Engineering in UC** | Any Delta table with a primary key is a *feature table*. `FeatureLookup` + `create_training_set` gives point-in-time correct joins (time-series feature tables with `timestamp_keys`) and avoids **leakage**. The model remembers its features, so serving looks them up automatically. |
| **Online feature store / feature serving** | Low-latency lookup of features for real-time models (online tables / Lakebase-backed stores). |
| **AutoML** | Point at a table + target and get baseline models (classification, regression, forecasting) plus *generated, editable notebooks*. |
| **Hyperparameter tuning** | Optuna (recommended), Ray Tune; Hyperopt is legacy. |
| **Distributed training** | Spark MLlib (`pyspark.ml`), **TorchDistributor** (PyTorch DDP on Spark), DeepSpeed, **Ray on Databricks**, XGBoost distributed. |
| **"Many models"** | `groupBy(key).applyInPandas(train_fn)` trains one model per store/machine/SKU in parallel. |
| **Model Serving** | Serverless REST endpoints, autoscaling (incl. scale-to-zero), GPU, A/B traffic split, **inference tables** (log requests/responses to Delta). |
| **Lakehouse Monitoring** | Profiles tables and inference logs: data drift, null rates, model accuracy over time; generates dashboards & alerts. |
| **Serverless GPU compute** | On-demand GPUs for training/fine-tuning without managing clusters. |

### 18.4 Spark MLlib quick reference (used in the PdM project)
```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StringIndexer, OneHotEncoder, StandardScaler
from pyspark.ml.classification import GBTClassifier, RandomForestClassifier, LogisticRegression
from pyspark.ml.regression import GBTRegressor
from pyspark.ml.evaluation import BinaryClassificationEvaluator, MulticlassClassificationEvaluator, RegressionEvaluator

pipe = Pipeline(stages=[StringIndexer(inputCol="model", outputCol="model_idx"),
                        VectorAssembler(inputCols=feature_cols + ["model_idx"], outputCol="features"),
                        GBTClassifier(labelCol="label", featuresCol="features", maxIter=60, maxDepth=5)])
fitted = pipe.fit(train)
auc = BinaryClassificationEvaluator(labelCol="label", metricName="areaUnderPR").evaluate(fitted.transform(test))
```

### 18.5 ML best practices interviewers look for
* **Time-based splits** for time-series (train on the past, test on the future). Random splits leak future information.
* Build features with **point-in-time** logic (only data available at prediction time).
* Handle **class imbalance** (failures are rare): class weights, PR-AUC instead of accuracy, threshold tuning by business cost.
* Track *everything* in MLflow; register with signatures; promote via aliases after validation.
* Monitor drift and retrain on schedule/trigger.

---

## 19. Generative AI on Databricks (Mosaic AI)

**In plain English:** Databricks lets you build GenAI apps on your own governed data: call hosted LLMs, search your documents semantically (**Vector Search**), build **RAG** chatbots and **agents** that use tools (SQL functions, APIs), evaluate them with LLM judges, and serve them with guardrails and cost tracking (**AI Gateway**).

| Capability | What it is |
|---|---|
| **Foundation Model APIs** | Pay-per-token or provisioned-throughput endpoints for open models (Llama, GPT-OSS, Gemma, Qwen …) and external models (OpenAI, Anthropic, Gemini) through one interface. |
| **External models / AI Gateway** | Central governance for any LLM: rate limits, usage tracking, payload logging, PII guardrails, fallbacks. |
| **Vector Search** | Managed vector index that auto-syncs from a Delta table (Delta Sync index). Supports hybrid keyword + semantic search, filters, UC permissions. |
| **Agent Framework / Agent Bricks** | Author agents (LangGraph, OpenAI Agents SDK, DSPy, custom Python) with UC functions as tools. Agent Bricks gives auto-optimised agents for common tasks (information extraction, knowledge assistant, multi-agent supervisor). |
| **MLflow 3 for GenAI** | Tracing, evaluation datasets, LLM judges (correctness, groundedness, safety, guidelines), human feedback (Review App), production monitoring. |
| **AI Playground** | Chat UI to compare models, add tools, and export to code. |
| **AI Functions** | `ai_query`, `ai_classify`, `ai_extract`, `ai_parse_document` … for batch LLM work in SQL (Chapter 17). |
| **Databricks Apps** | Deploy the chat UI/app (Streamlit, Gradio, Dash, Flask, React) with built-in auth. |
| **Lakebase** | Managed Postgres for app state, agent memory, and low-latency serving, synced with Delta tables. |

**Typical RAG architecture on Databricks**
```
PDFs in Volume → ai_parse_document / chunking job → Delta table (chunks, metadata)
   → Vector Search index (auto-sync, embeddings via a served embedding model)
   → Agent (retriever tool + LLM via Model Serving) logged with MLflow, evaluated with judges
   → deployed to Model Serving (agents.deploy) → Review App for SME feedback → Apps UI
   → inference tables + monitoring
```

---

## 20. Performance tuning

**In plain English:** Most slowness comes from reading too much data, moving too much data (shuffles), uneven data (skew), too many tiny files, or not enough memory (spill). Find the slow stage in the Spark UI or query profile, identify which of these it is, and apply the matching fix.

### 20.1 Diagnose first: Spark UI / query profile
* **Jobs → Stages**: find the longest stage. Look at the task duration distribution (max ≫ median = **skew**), **shuffle read/write** size, **spill (memory/disk)**, input size, and number of tasks.
* **SQL/DataFrame tab**: the physical plan with rows per operator. Look for exploding joins (rows out ≫ rows in), missing filter pushdown, and `SortMergeJoin` where a broadcast would do.
* **DBSQL query profile**: time per operator, bytes read, files pruned, and cache hits.
* **Executors tab**: GC time, memory use, failed tasks.

### 20.2 Symptom → fix table

| Symptom | Likely cause | Fix |
|---|---|---|
| Reads whole table for a selective query | No data skipping | Filter on clustering columns; **liquid clustering** / Z-ORDER; avoid functions on filter columns; ANALYZE stats |
| Thousands of tiny files, slow reads | Small-file problem (streaming, over-partitioning) | `OPTIMIZE`, auto-compaction / optimized writes, predictive optimization, remove over-partitioning |
| One/few tasks take far longer | **Data skew** (hot keys, NULL keys) | AQE skew join (on by default), filter/handle NULL keys separately, **salting**, broadcast the small side |
| Spill to disk | Partitions too large for memory | More shuffle partitions (or AQE auto), bigger/memory-optimised nodes, reduce columns early |
| Huge shuffle | Wide transformations on big data | Broadcast small tables, pre-aggregate before join, filter/select early, avoid unnecessary `distinct`/`orderBy` |
| Driver OOM | `collect()`/`toPandas()` of big data, huge broadcast | Keep work distributed, write results to tables, limit broadcast size |
| Slow Python | Row-wise Python UDFs | Built-in functions → SQL UDF → pandas UDF |
| Re-computing the same DataFrame | Lineage re-executed per action | `cache()`/`persist()` the reused DataFrame, or write an intermediate table |
| Slow MERGE | Scanning the whole target | Add clustering/partition predicates to the ON clause, deletion vectors, liquid clustering on merge keys |
| Slow cold starts | VM provisioning | Serverless, instance pools |
| Streaming falling behind | Under-provisioned or large state | Scale out, RocksDB state store, watermarks, `maxFilesPerTrigger`/`maxBytesPerTrigger` tuning |

### 20.3 Handy configs & commands
```python
spark.conf.set("spark.sql.shuffle.partitions", "auto")            # AQE auto-tunes on Databricks
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", 100 * 1024 * 1024)
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")     # default true
df.hint("broadcast"); df.hint("skew", "customer_id")               # SQL: /*+ BROADCAST(r) */
spark.sql("SET spark.databricks.delta.optimizeWrite.enabled = true")
spark.sql("ALTER TABLE t SET TBLPROPERTIES (delta.autoOptimize.autoCompact = true)")
```
**Salting example** (spread a hot key over N buckets):
```python
N = 16
big = big.withColumn("salt", (F.rand() * N).cast("int"))
small = small.withColumn("salt", F.explode(F.array([F.lit(i) for i in range(N)])))
joined = big.join(small, ["key", "salt"])
```

### 20.4 Layout guidance (2025+ defaults)
* Use **UC managed tables + predictive optimization + liquid clustering** (`CLUSTER BY AUTO` or 1–4 columns you filter/join on).
* Don't partition tables under ~1 TB. If you do partition, use low-cardinality date-like columns.
* Target file sizes around 128 MB–1 GB (OPTIMIZE handles this automatically).

---

## 21. Cost management

**In plain English:** You pay for compute time (DBUs + cloud VMs), not for idle data. Save money by using the right compute type, turning things off automatically, using spot instances, making jobs faster, and watching usage in system tables.

| Lever | Why it saves money |
|---|---|
| **Job compute / serverless jobs instead of all-purpose clusters** for production | Much lower DBU rate; no idle time |
| **Auto-termination** (clusters) / **auto-stop** (warehouses) | No paying for idle compute |
| **Serverless** | Pay only while running; no over-provisioning; instant start |
| **Spot instances** for workers | Up to 60–90% cheaper VMs |
| **Right-size & autoscale** | Avoid huge fixed clusters |
| **Photon** | Higher DBU rate but often much shorter runtime, so a net saving for SQL-heavy work |
| **`availableNow` triggers** instead of 24/7 streams | Incremental processing on a schedule |
| **Cluster policies** | Cap sizes, force tags/auto-termination |
| **Tags + budgets + system tables** | Attribute cost to teams/projects; alert on overspend |
| **Efficient code & layout** | Less data scanned = less compute |

```sql
-- Cost per job in the last 30 days
SELECT usage_metadata.job_id, sum(u.usage_quantity * p.pricing.default) AS est_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices p ON u.sku_name = p.sku_name AND u.usage_start_time >= p.price_start_time
     AND (p.price_end_time IS NULL OR u.usage_start_time < p.price_end_time)
WHERE u.usage_date >= current_date() - 30 AND usage_metadata.job_id IS NOT NULL
GROUP BY 1 ORDER BY 2 DESC LIMIT 20;
```

---

## 22. Security & administration

**In plain English:** Admins control who can log in (identity), what they can do (permissions via Unity Catalog and workspace ACLs), how networks connect (private links, firewalls), how secrets are stored, and how data is encrypted. Everything is audited.

| Area | Key points |
|---|---|
| **Identities** | Users, **groups** (grant to groups, not users), **service principals** (non-human identities for jobs/CI-CD). Managed at account level; synced from Entra ID/Okta via **SCIM**; SSO with SAML/OIDC; MFA from the IdP. |
| **Admin roles** | Account admin, workspace admin, metastore admin, marketplace admin; plus object *owners*. |
| **Workspace ACLs** | Permissions on notebooks, folders, jobs, clusters, warehouses, dashboards (CAN VIEW / RUN / EDIT / MANAGE). |
| **Data permissions** | Unity Catalog (Chapter 16): grants, row filters, column masks, ABAC. |
| **Authentication for automation** | **OAuth** (M2M for service principals, U2M for users) preferred over personal access tokens (PATs). Workload identity federation for GitHub Actions etc. |
| **Secrets** | Secret scopes (Databricks-backed or Azure Key Vault-backed). `dbutils.secrets.get()`; values are redacted in notebook output. UC connections/credentials for external systems. |
| **Networking** | Classic compute in your VNet/VPC (**VNet injection / customer-managed VPC**), **Private Link** (front-end: users→workspace; back-end: compute→control plane), **IP access lists**, secure cluster connectivity (no public IPs), **serverless network policies / NCC** for egress control. |
| **Encryption** | At rest (cloud-managed or **customer-managed keys**), in transit (TLS). |
| **Compliance** | Compliance security profile (HIPAA, PCI-DSS, FedRAMP …), enhanced security monitoring, audit logs → `system.access.audit`. |

---

## 23. DevOps: Git, Asset Bundles, CI/CD, CLI/SDK/REST, Databricks Connect, testing

**In plain English:** Treat Databricks code like any software. Keep it in Git, test it, and deploy it automatically from dev → staging → prod with **Declarative Automation Bundles / Asset Bundles**. Those YAML files describe your jobs, pipelines, and notebooks, and a CI pipeline deploys them.

| Tool | Use |
|---|---|
| **Git folders** (formerly Repos) | Clone GitHub/GitLab/Azure DevOps/Bitbucket repos into the workspace; branch, commit, pull, and PR from the UI. |
| **Databricks Asset Bundles (DABs)** | `databricks.yml` defines resources (jobs, pipelines, dashboards, models, apps, schemas, volumes) + **targets** (dev/staging/prod) with variables. `databricks bundle validate / deploy -t prod / run job_name / destroy`. |
| **Databricks CLI** | Everything from the terminal: `databricks fs cp`, `jobs list`, `bundle …`, `auth login`. |
| **Databricks SDK** (Python/Java/Go) | Programmatic workspace automation: `WorkspaceClient().jobs.run_now(job_id=…)`. |
| **REST API** | Underlying API for all of the above. |
| **Terraform provider** | Infrastructure-as-code for workspaces, UC, clusters, permissions (platform teams). |
| **Databricks Connect** | Run PySpark code from VS Code/PyCharm/Jupyter on remote Databricks compute (debug locally, execute remotely). |
| **VS Code extension** | Sync code, run files/notebooks on clusters, bundles integration. |
| **dbt** | SQL transformation framework; the `dbt-databricks` adapter, run as a job task. |

**Minimal bundle** (the project's `databricks.yml` is a complete example):
```yaml
bundle: { name: logistics_medallion }
targets:
  dev:  { mode: development, default: true, workspace: { host: https://adb-xxx.azuredatabricks.net } }
  prod: { mode: production, workspace: { host: https://adb-yyy.azuredatabricks.net } }
resources:
  jobs:
    logistics_medallion:
      name: logistics_medallion
      tasks:
        - task_key: bronze
          notebook_task: { notebook_path: ./notebooks/logistics/01_bronze_ingest.py }
        - task_key: silver
          depends_on: [{ task_key: bronze }]
          notebook_task: { notebook_path: ./notebooks/logistics/02_silver_clean.py }
```

**Typical CI/CD flow**
```
feature branch → PR → CI: lint + unit tests (pytest, chispa) + `bundle validate` + deploy to staging + integration test run
   → merge to main → CD: `databricks bundle deploy -t prod` (run as service principal) → jobs run on schedule
```

**Testing**
* Put transformation logic in **functions/modules** (e.g. `standardise_and_type`, `deduplicate` in this project) and unit-test them with small DataFrames (pytest + local Spark or Databricks Connect; `chispa` / `pyspark.testing.assertDataFrameEqual` for DataFrame equality).
* Data tests: expectations, DQ scorecards, reconciliation queries, Lakehouse Monitoring.
* Integration tests: run the bundle job in staging against sample data.


---

# LEVEL 4 — APPLY IT

## 24. How the two assignments are built

**In plain English:** Both datasets are processed with the same Medallion recipe. CSV files land in a Volume, **Bronze** copies them as raw strings with lineage columns, **Silver** types/cleans/validates them, and **Gold** builds business tables that answer every question. The same notebooks run on Databricks (writing Delta tables in Unity Catalog) and on a laptop (plain PySpark, in-memory tables), so the numbers in the answer documents were produced by the exact code you'll run.

### 24.1 Project layout

```
Databricks_Mastery/
├── EVERYTHING_ON_DATABRICKS.md          ← this guide
├── ANSWERS_LOGISTICS.md                 ← results + interpretation for the 8 logistics questions
├── ANSWERS_PREDICTIVE_MAINTENANCE.md    ← results + interpretation for the 10 PdM questions
├── databricks.yml                       ← Asset Bundle: both pipelines as Lakeflow Jobs
├── run_local.py                         ← run notebooks on a laptop with PySpark
├── data/logistics/*.csv, data/pdm/*.csv ← the raw files (upload these to Volumes)
├── notebooks/
│   ├── _common.py                       ← env detection, catalog/schema setup, save()/table()/sql() helpers
│   ├── logistics/01_bronze_ingest.py    ← CSV → bronze.* (strings + _ingest_ts/_source_file) + Auto Loader & COPY INTO patterns
│   ├── logistics/02_silver_clean.py     ← typing, dedupe, DQ rules, quarantine, FK checks, dq_summary
│   ├── logistics/03_gold_model.py       ← star schema: dims + fact_trip + event facts
│   ├── logistics/04_gold_kpis_answers.py← gold.kpi_* marts answering Q1–Q8
│   ├── pdm/01_bronze_ingest.py
│   ├── pdm/02_silver_clean.py           ← typed telemetry, completeness/outlier checks, event tables
│   ├── pdm/03_gold_features.py          ← hourly feature table: rolling windows, error counts, time-since-maintenance, labels
│   ├── pdm/04_gold_insights_eda.py      ← Q1, Q2, Q3, Q9, Q10
│   └── pdm/05_gold_ml_models.py         ← Q4 forecasting, Q5 anomaly detection, Q6 failure risk, Q7 component, Q8 RUL (+MLflow)
├── pipelines/logistics_declarative_pipeline.py ← same logistics Medallion as a Lakeflow Declarative Pipeline (DLT)
└── outputs/                             ← full printed results of the local runs
```

### 24.2 Unity Catalog layout on Databricks

```
logistics (catalog)                          pdm (catalog)
 ├── raw     → Volume landing (14 CSVs)       ├── raw    → Volume landing (5 CSVs)
 ├── bronze  → 14 raw tables                  ├── bronze → 5 raw tables
 ├── silver  → 14 clean tables                ├── silver → telemetry, errors, failures, maint, machines
 │             + quarantine_* + dq_summary    │            + quarantine_* + dq_summary
 └── gold    → dim_* / fact_* / kpi_*         └── gold   → features_hourly, component_lifecycles,
                                                           insight_* tables, ml predictions
                                               (models registered as pdm.gold.<model_name>)
```

### 24.3 How to run it on Databricks (step by step)
1. **Import the code**: *Workspace → Create → Git folder* (if you push this folder to Git) or *Import* the `notebooks` folder (the `.py` files are recognised as notebooks).
2. **Create the catalogs** (or let `_common` do it; it runs `CREATE CATALOG IF NOT EXISTS`). If your workspace doesn't allow creating catalogs, set the `catalog` widget to one you own, e.g. `main`.
3. **Upload data**: *Catalog → logistics → raw → landing → Upload to this volume*. Upload the 14 logistics CSVs. Do the same for `pdm/raw/landing` with the 5 PdM CSVs.
4. **Run notebooks in order** (`01` → `04` for logistics; `01` → `05` for PdM) on serverless or a cluster (use an **ML runtime** cluster for PdM notebook 05 if you want the LSTM/IsolationForest cells).
5. **Schedule**: deploy `databricks.yml` with `databricks bundle deploy -t dev` and run `databricks bundle run logistics_medallion`, or build the job in the UI (*Jobs & Pipelines → Create job* → 4 notebook tasks chained).
6. **Dashboard**: *Dashboards → Create* → add datasets such as `SELECT * FROM logistics.gold.kpi_route_profitability`. Add a **Genie space** over the `gold` schema so business users can ask "Which lanes lost money last quarter?"
7. **Optional**: create a Declarative Pipeline from `pipelines/logistics_declarative_pipeline.py` to compare the declarative approach.

### 24.4 Design decisions you should be able to defend
* **Bronze = all strings + audit columns** so ingestion never fails on bad values and we can replay from Bronze.
* **Silver = `try_cast` + rules with severities** so bad rows are quarantined, warnings are kept but flagged, and the DQ scorecard is stored as a table.
* **`UNKNOWN` dimension members**: ~2% of trips have no driver/truck/trailer, yet their revenue must still count in route/customer totals.
* **Ratios recomputed from sums** (MPG = Σmiles ÷ Σgallons; on-time % from events), never averages of averages.
* **Trip fuel cost = gallons consumed × that month's average price paid**, because fuel purchases don't cleanly map to trip consumption and their locations are unreliable (95% city/state mismatch found in Silver).
* **Maintenance allocated per mile per truck-year**, so each trip carries a fair share of maintenance cost.
* **Time-based train/test split** in all PdM models (train on Jan–Aug 2015, test on Sep–Dec 2015) to avoid leakage.
* **Same code, two runtimes**: `_common.save()` writes managed Delta tables on Databricks and in-memory temp views locally.

---

## 25. Interview questions & answers

### 25.1 Basics

1. **What is Databricks?** A cloud data & AI platform (AWS/Azure/GCP) built on Apache Spark, Delta Lake, MLflow, and Unity Catalog. It unifies data engineering, SQL analytics/BI, data science, ML, and GenAI on one governed lakehouse.
2. **What is a lakehouse?** An architecture that stores all data in low-cost object storage in open formats and adds warehouse capabilities (ACID, schema enforcement, governance, performance) via a table format like Delta Lake. One copy serves BI, ML, and streaming.
3. **Data lake vs data warehouse vs lakehouse?** A lake is cheap and flexible but unreliable. A warehouse is reliable and fast for SQL but costly, proprietary, and structured-only. A lakehouse combines both.
4. **Control plane vs compute plane?** The control plane holds Databricks-managed backend services (UI, notebooks, jobs, cluster manager, UC). The compute plane is where data is processed: your cloud account (classic) or Databricks' account (serverless).
5. **What is a workspace?** An environment for a team (notebooks, jobs, compute, dashboards). An account can have many workspaces attached to regional UC metastores.
6. **What is a DBU?** Databricks Unit, a normalised measure of processing per hour used for billing. The rate depends on compute type and tier.
7. **All-purpose vs job cluster?** All-purpose is interactive, shared, manually started, and more expensive. Job clusters are created for one job run then terminated, and are cheaper. Use job compute or serverless for production.
8. **What is a SQL warehouse?** Compute dedicated to SQL (editor, dashboards, BI tools). Serverless is recommended: instant start, Photon, auto-scaling for concurrency.
9. **What is Databricks Runtime? LTS? ML Runtime?** A versioned image with Spark + Delta + libraries. LTS versions are supported longer, so use them for production. The ML Runtime adds ML/DL libraries.
10. **What is Photon?** Databricks' native vectorised C++ query engine that accelerates SQL/DataFrame operations. Not used for Python UDFs or RDDs.
11. **What is DBFS? Is it still recommended?** A file system abstraction over object storage. The DBFS root and mounts are legacy. Use Unity Catalog Volumes for files and UC tables for data.
12. **What is a Volume?** A Unity Catalog object for governed non-tabular files, addressed as `/Volumes/catalog/schema/volume/path`.
13. **Managed vs external table?** Managed means UC controls storage and `DROP` deletes the data; it's eligible for predictive optimization. External means you specify a path and `DROP` keeps the files.
14. **Magic commands?** `%python %sql %scala %r %md %sh %fs %run %pip`.
15. **`%run` vs `dbutils.notebook.run`?** `%run` executes inline in the same context (shares variables). `dbutils.notebook.run` launches a separate run with parameters and a return value, and can run in parallel.
16. **What is `dbutils`?** Utilities for files (`fs`), secrets, widgets, notebook chaining, job task values, and library management.
17. **What are widgets?** Notebook parameters (text/dropdown/combobox/multiselect). Job task parameters populate them.
18. **How do you share data between Python and SQL cells?** Temp views (`createOrReplaceTempView`), tables, or `_sqldf` for the last SQL result.
19. **How do you install libraries?** `%pip install` (notebook-scoped), cluster libraries, job/serverless environments, or from Volumes/wheels. Init scripts for OS-level needs.
20. **What is Unity Catalog?** Centralised governance for data & AI assets across workspaces: a three-level namespace, permissions, row/column security, lineage, audit, discovery, and sharing.
21. **Three-level namespace?** `catalog.schema.table` (e.g. `logistics.gold.fact_trip`).
22. **What is Delta Lake?** An open-source table format: Parquet files + a JSON transaction log, providing ACID, time travel, schema enforcement/evolution, MERGE/UPDATE/DELETE, and data skipping.
23. **What is the medallion architecture?** Bronze (raw) → Silver (cleaned, conformed) → Gold (business aggregates/models) layering for progressive data quality.
24. **What is Auto Loader?** The `cloudFiles` source that incrementally and efficiently ingests new files with checkpointing and schema inference/evolution.
25. **What are Lakeflow Declarative Pipelines (DLT)?** A declarative ETL framework: define streaming tables and materialized views with expectations. Databricks manages dependencies, orchestration, retries, and lineage.
26. **What is a Lakeflow Job (Workflow)?** An orchestrator of tasks (notebooks, SQL, pipelines, wheels, dbt, conditions, loops) with triggers, retries, parameters, and notifications.
27. **What is MLflow?** Open-source ML lifecycle tool: tracking, model packaging, registry (in UC), evaluation, and GenAI tracing.
28. **What is Delta Sharing?** An open protocol to securely share live data (tables, views, volumes, models) across organisations and platforms without copying.
29. **What is serverless compute?** Databricks-managed compute that starts in seconds and scales automatically, with no VM config, billed per use.
30. **What is Genie?** A natural-language interface over curated tables; it generates SQL and answers for business users.

### 25.2 Apache Spark

31. **Explain Spark architecture.** A driver plans and schedules. Executors on workers run tasks, one per core, each on a partition. The cluster manager allocates resources.
32. **Job vs stage vs task?** An action triggers a job. A job splits into stages at shuffle boundaries. A stage runs one task per partition.
33. **Transformation vs action?** Transformations are lazy and build the plan (select, filter, join). Actions trigger execution (count, collect, write, show).
34. **Narrow vs wide transformations?** Narrow has no data movement (filter, select). Wide requires a shuffle (groupBy, join, distinct, orderBy).
35. **What is a shuffle, and why is it expensive?** Redistribution of data across the network by key. It involves disk writes, serialisation, and network I/O, so it's usually the main cost.
36. **What is lazy evaluation, and why?** Spark delays execution until an action, so Catalyst can optimise the whole plan (pushdown, pruning, reordering).
37. **What does Catalyst do?** Parses, analyses, and optimises logical plans (predicate pushdown, column pruning, constant folding, join reordering) and chooses physical plans.
38. **What is Tungsten?** Spark's execution engine improvements: off-heap binary memory and whole-stage code generation.
39. **What is AQE?** Adaptive Query Execution re-optimises at runtime: it coalesces shuffle partitions, switches to broadcast joins, and handles skewed joins.
40. **`repartition` vs `coalesce`?** `repartition` does a full shuffle and can increase/decrease or partition by column. `coalesce` merges partitions without a full shuffle and only decreases.
41. **`cache` vs `persist`?** `cache()` = `persist(MEMORY_AND_DISK)` for DataFrames. `persist` lets you choose the storage level. Both are lazy and materialise on the first action.
42. **Broadcast join: what and when?** Send the small table to all executors to avoid shuffling the large one. Use when one side is small (auto under 10 MB by default; hint with `broadcast()`).
43. **Sort-merge join?** The default for two large tables: shuffle both by key, sort, and merge.
44. **What is data skew and how do you handle it?** Uneven key distribution makes a few tasks take very long. Fixes: AQE skew join, salting, broadcast, isolating hot/NULL keys, pre-aggregation.
45. **What causes spill?** Partitions exceed execution memory. Fix with more partitions, bigger memory, less data per task, or reducing columns early.
46. **`groupByKey` vs `reduceByKey`?** (RDD) `reduceByKey` combines map-side before the shuffle, so less data moves. In DataFrames, `groupBy().agg()` does partial aggregation automatically.
47. **RDD vs DataFrame vs Dataset?** An RDD is a low-level distributed collection with no optimiser. A DataFrame has schema-aware columns and is optimised by Catalyst. A Dataset is a typed DataFrame (Scala/Java). Use DataFrames/SQL.
48. **Python UDF vs pandas UDF?** Python UDFs are row-by-row with serialisation overhead. Pandas UDFs use Arrow batches and vectorised operations, making them much faster. Built-in functions are fastest of all.
49. **What's the default shuffle partition count?** 200 (`spark.sql.shuffle.partitions`). AQE/"auto" adjusts it on Databricks.
50. **How do you read a physical plan?** `df.explain("formatted")`. Look for Exchange (shuffle), BroadcastHashJoin vs SortMergeJoin, PushedFilters, and number of files read.
51. **What is `collect()`'s risk?** It brings all data to the driver, which can cause an out-of-memory error. Use `take/limit/display`, or write to a table.
52. **Window functions examples?** `row_number` (dedupe/latest), `rank/dense_rank`, `lag/lead` (change detection), running totals, and rolling windows with `rangeBetween`.
53. **How do you remove duplicates keeping the latest record?** `row_number() OVER (PARTITION BY key ORDER BY updated_at DESC) = 1`, or `QUALIFY` in SQL.
54. **What is the SparkSession?** The entry point for DataFrame/SQL APIs. Pre-created as `spark` in Databricks.
55. **Explain partition pruning vs data skipping.** Partition pruning skips whole partition folders based on partition-column filters. Data skipping uses per-file min/max stats (Delta) to skip files, even without partitioning.

### 25.3 Delta Lake

56. **How does Delta provide ACID on object storage?** Via the `_delta_log` transaction log. Each commit is an atomic JSON file listing added/removed data files, with optimistic concurrency control.
57. **What's in the `_delta_log`?** Ordered JSON commits (add/remove file actions, metadata, schema, protocol, commit info) and periodic Parquet checkpoints.
58. **What is time travel?** Querying or restoring earlier versions with `VERSION AS OF` / `TIMESTAMP AS OF` / `RESTORE`.
59. **What limits time travel?** `VACUUM` removing old data files (default 7-day retention) and log retention (default 30 days).
60. **What does `OPTIMIZE` do?** Compacts small files into larger ones (bin-packing). With `ZORDER BY`, it also co-locates data.
61. **Z-ORDER vs liquid clustering?** Z-ORDER is a multi-column co-location applied at OPTIMIZE time; it isn't incremental and is tied to layout. Liquid clustering (`CLUSTER BY`) is incremental, keys can be changed, it handles skew, and it replaces partitioning + Z-ORDER for new tables.
62. **What does `VACUUM` do?** Deletes files no longer referenced by the table and older than the retention period.
63. **Schema enforcement vs evolution?** Enforcement rejects mismatched writes. Evolution allows adding columns (`mergeSchema`, `autoMerge`, `ALTER TABLE`, MERGE `WITH SCHEMA EVOLUTION`).
64. **What is MERGE used for?** Upserts, CDC application, SCD1/SCD2, de-duplicated inserts, deletes from source snapshots.
65. **How do you implement SCD Type 2 in Delta?** MERGE that closes the current row (`is_current=false`, `valid_to`) and inserts a new version. Or `AUTO CDC ... STORED AS SCD TYPE 2` in a declarative pipeline.
66. **What is Change Data Feed?** Row-level change records (insert, update pre/post images, delete) between versions, read with `table_changes()` or `readChangeFeed`, for incremental downstream processing.
67. **What are deletion vectors?** Bitmaps marking deleted rows so UPDATE/DELETE/MERGE don't rewrite whole files (merge-on-read), making them much faster.
68. **What is the small-file problem?** Many tiny files mean slow listing/opening and poor parallelism. Fix with OPTIMIZE, auto-compaction, optimized writes, fewer partitions, and predictive optimization.
69. **When should you partition a Delta table?** Rarely: very large tables (> 1 TB), low-cardinality commonly filtered columns (date). Otherwise use liquid clustering.
70. **Shallow vs deep clone?** A shallow clone copies only metadata (references source files), which is great for testing. A deep clone copies data and metadata (backups/migrations).
71. **What constraints does Delta support?** `NOT NULL` and `CHECK` are enforced. PK/FK are informational in UC.
72. **What is predictive optimization?** Databricks automatically runs OPTIMIZE/VACUUM/ANALYZE on UC managed tables based on usage.
73. **What is UniForm?** Delta tables that also write Iceberg (and Hudi) metadata so Iceberg readers can query them.
74. **How are concurrent writes handled?** Optimistic concurrency. Conflicts raise exceptions (e.g. `ConcurrentAppendException`). Mitigate by writing disjoint data, adding predicates, or row-level concurrency.
75. **`replaceWhere`?** Overwrite only the rows matching a predicate (e.g. one month) atomically.
76. **How do you undo a bad load?** `RESTORE TABLE t TO VERSION AS OF n` (or `TIMESTAMP AS OF`).
77. **What are Delta table stats?** Min/max/null counts per file for the first 32 columns (configurable), used for data skipping.
78. **Identity vs generated columns?** Identity auto-generates unique surrogate keys. A generated column is computed from other columns (e.g. year from date).
79. **How do you see table size, files, clustering?** `DESCRIBE DETAIL table`.
80. **Delta vs Parquet?** Parquet is a file format. Delta is a table format on Parquet adding a transaction log (ACID, versioning, DML, schema enforcement).

### 25.4 Medallion, ETL design & data modelling

81. **Bronze responsibilities?** Land raw data as-is, append-only, with lineage metadata (`_ingest_ts`, `_source_file`), restricted access, replayable.
82. **Silver responsibilities?** Typing, cleaning, dedupe, validation/quarantine, standardisation, joins with reference data, SCD/MERGE; a trusted entity layer.
83. **Gold responsibilities?** Business-level models: star schemas, KPI aggregates, feature tables; optimised for consumption.
84. **Why keep Bronze if Silver has the clean data?** Replay after logic bugs, audit/lineage, schema-drift handling, and reprocessing without re-extracting from sources.
85. **How do you handle bad records?** Permissive reads, `_rescued_data`, `try_cast`, DQ rules routing to quarantine tables, expectations (drop/fail/warn), and alerting on DQ metrics.
86. **How do you ensure idempotency?** Checkpoints (Auto Loader/streaming), COPY INTO file tracking, MERGE on keys instead of blind appends, `replaceWhere` overwrites per partition.
87. **Full vs incremental load?** Full reloads everything (simple, costly). Incremental processes only new/changed data (Auto Loader, CDF, watermarks, CDC).
88. **What is CDC and how do you apply it?** Change data capture from source DBs (insert/update/delete events). Apply with MERGE (ordering by sequence/timestamp) or `AUTO CDC`.
89. **Explain a star schema.** A central fact table (measures at a grain) with foreign keys to dimension tables (descriptive attributes). It's simple and fast for BI.
90. **What is the grain of a fact table?** What one row represents (e.g. one trip). It must be declared first, and every measure must be consistent with it.
91. **Why not average averages?** Weighted results differ. Compute ratios from summed components (Σmiles/Σgallons).
92. **What is an `UNKNOWN` dimension member?** A placeholder row so facts with missing keys still join and aggregate correctly.
93. **SCD types?** Type 0 retain original, 1 overwrite, 2 new row with history, 3 previous-value column, 6 hybrid.
94. **How do you model late-arriving data?** Watermarks in streaming, MERGE with sequence ordering, reprocess affected partitions, and "inferred members" for late dimensions.
95. **How do you organise catalogs for dev/prod?** Separate catalogs (`dev`, `prod`) or per-domain catalogs with env-specific names via parameters, workspace-catalog bindings, and deploy code through bundles.

### 25.5 Streaming & pipelines

96. **Structured Streaming model?** A stream is an unbounded table processed incrementally in micro-batches with checkpointed progress and exactly-once Delta sinks.
97. **What is a checkpoint?** A folder storing offsets and state so a stream resumes exactly where it stopped. It must be unique per stream.
98. **Triggers?** Processing-time interval, `availableNow` (process backlog then stop), continuous/real-time mode.
99. **Output modes?** Append, update, complete.
100. **What is a watermark?** A threshold for late data (`withWatermark("ts", "10 minutes")`) that lets Spark finalise windows and drop old state.
101. **Stream-static vs stream-stream join?** Stream-static enriches with a static/Delta table (re-read each batch). Stream-stream needs watermarks and time constraints on both sides.
102. **What is `foreachBatch`?** Run arbitrary batch logic (e.g. MERGE, writes to multiple sinks) on each micro-batch.
103. **How do you get exactly-once?** Replayable source + checkpoint + idempotent/transactional sink (Delta).
104. **Auto Loader directory listing vs file notification?** Listing scans the directory (simple). Notification uses cloud events/queues and scales to millions of files.
105. **Auto Loader schema evolution modes?** `addNewColumns` (default), `rescue`, `failOnNewColumns`, `none`.
106. **Streaming table vs materialized view?** A streaming table processes each input row once (append sources, low latency). An MV recomputes/incrementally refreshes a query result (aggregations, joins).
107. **Expectations actions?** `expect` (warn/keep), `expect_or_drop`, `expect_or_fail`.
108. **What is `AUTO CDC` / `APPLY CHANGES`?** Declarative CDC application handling out-of-order events, deletes, and SCD1/2.
109. **Development vs production pipeline mode?** Development reuses clusters and doesn't retry, for faster iteration. Production restarts on failure and uses fresh clusters.
110. **How do you pass values between job tasks?** Task values (`dbutils.jobs.taskValues.set/get`) and dynamic value references `{{tasks.<key>.values.<name>}}`.
111. **What is a repair run?** Re-running only failed tasks (and their dependants) of a job run.
112. **Job triggers?** Cron schedule, file arrival, table update, continuous, API/manual.
113. **How do you run a job task in a loop?** A "For each" task over a list parameter (with concurrency).
114. **How do you orchestrate a pipeline plus ML retraining?** A Lakeflow Job: pipeline task → notebook training task → condition task (metric > threshold) → register/deploy task.
115. **Kafka ingestion options?** `spark.readStream.format("kafka")` into a Bronze streaming table; parse value JSON/Avro in Silver (`from_json` / `from_avro` with a schema registry).

### 25.6 Unity Catalog & security

116. **Privileges needed to query a table?** `USE CATALOG`, `USE SCHEMA`, `SELECT`.
117. **How is privilege inheritance used?** Grant at catalog/schema level so all current and future child objects inherit.
118. **Row-level security?** Row filters (`SET ROW FILTER fn ON (col)`) or dynamic views. ABAC policies with tags.
119. **Column masking?** `ALTER COLUMN c SET MASK fn`, using `is_account_group_member()` in the function.
120. **What lineage does UC capture?** Table- and column-level lineage across notebooks, jobs, pipelines, dashboards, and models, automatically.
121. **What are system tables?** `system.*` tables for billing, audit, lineage, compute, jobs, and query history, queryable with SQL.
122. **Storage credential vs external location?** A credential is the cloud identity. An external location is path + credential, governing access to that path.
123. **Service principal?** A non-human identity for jobs/CI-CD. Use OAuth M2M.
124. **How do you store secrets?** Secret scopes (Databricks or Key Vault-backed) with `dbutils.secrets.get`; values are redacted.
125. **What is Lakehouse Federation?** Querying external databases through UC foreign catalogs without ingestion.
126. **How do you migrate from Hive metastore to UC?** UCX assessment, `SYNC` for external tables, CTAS/DEEP CLONE for managed tables, update code to three-level names, switch clusters to UC access modes.
127. **Access modes?** Standard (shared, multi-user isolation) and Dedicated (single user/group, full features).

### 25.7 SQL & BI

128. **Why serverless SQL warehouses?** Instant start, auto-scale for concurrency, Photon, and Intelligent Workload Management, so there's no idle cost with auto-stop.
129. **Cluster size vs number of clusters in a warehouse?** Size = power per query (latency). Min/max clusters = concurrency (more simultaneous queries).
130. **How do you speed up a dashboard?** Gold aggregates/MVs, liquid clustering on filter columns, a serverless warehouse, the result cache, fewer and more efficient queries, and parameters/filters.
131. **What are AI functions?** SQL functions calling LLMs/ML (ai_query, ai_classify, ai_extract, ai_forecast …) for batch AI in SQL.
132. **`QUALIFY`?** Filters on window function results without a subquery.
133. **`GROUP BY ALL`?** Groups by all non-aggregated select columns.
134. **How do BI tools connect?** JDBC/ODBC to SQL warehouses, Partner Connect, and Power BI publishing. Permissions come from UC.
135. **What is a metric view?** A governed definition of business metrics/dimensions in UC, reusable across dashboards, Genie, and SQL.

### 25.8 ML & AI

136. **Describe the ML lifecycle on Databricks.** Features in Delta/UC → train with ML Runtime/AutoML → track with MLflow → register in UC (aliases) → serve (Model Serving or batch) → monitor (Lakehouse Monitoring, inference tables) → retrain via Jobs.
137. **Model registry stages vs aliases?** The legacy workspace registry used stages (Staging/Production). The UC registry uses flexible aliases (`@champion`) plus versions and permissions.
138. **What is a feature table?** A Delta table with a primary key (and optional timestamp key) registered in UC. It enables point-in-time lookups for training and automatic lookup at serving.
139. **What is point-in-time correctness?** Using only feature values known at the label's timestamp, to avoid leakage.
140. **How do you do batch inference?** `mlflow.pyfunc.spark_udf` on a Delta table in a job, `ai_query` in SQL, or batch endpoints.
141. **Real-time inference?** Model Serving endpoints (REST) with autoscaling, feature lookups, and inference tables.
142. **How do you train many models in parallel?** `groupBy().applyInPandas()` with one model per group, logged to MLflow.
143. **How do you do distributed deep learning?** TorchDistributor, DeepSpeed, Ray on Databricks, GPU clusters/serverless GPU.
144. **Imbalanced classification (e.g. failures)?** Class weights/resampling, PR-AUC/recall at a fixed precision, threshold tuning by business cost, time-based validation.
145. **What does AutoML produce?** Trained candidate models, an MLflow experiment, a data exploration notebook, and editable source notebooks for each trial.
146. **What is Lakehouse Monitoring?** Automatic profiling and drift metrics for tables and inference logs, with dashboards and alerts.
147. **What is RAG and how is it built on Databricks?** Retrieval-augmented generation: chunk documents → embeddings → Vector Search index synced from Delta → retriever + LLM agent → MLflow evaluation → Model Serving → Apps UI.
148. **What is Vector Search?** A managed similarity search index over embeddings that auto-syncs with a Delta table and respects UC permissions.
149. **What is AI Gateway?** Governance for model endpoints: rate limits, usage tracking, payload logging, guardrails, fallbacks.
150. **How do you evaluate a GenAI agent?** MLflow evaluation with datasets + LLM judges (correctness, groundedness, relevance, safety) + human review + tracing in production.

### 25.9 Performance & cost

151. **A job suddenly got slower. How do you investigate?** Compare run durations and the Spark UI across runs: data volume growth, skew, spill, new shuffles, file count (small files), plan changes, cluster changes. Check system tables for trends.
152. **Query scans too much data.** Add filters on clustering columns, liquid clustering/Z-ORDER, avoid wrapping filter columns in functions, compute stats, select only needed columns.
153. **How do you reduce cost for nightly ETL?** Job compute/serverless jobs, spot workers, autoscaling, Photon if SQL-heavy, `availableNow` incremental processing, fewer shuffles, cluster policies.
154. **What's the disk cache?** Automatic SSD caching of remote Parquet/Delta data on workers (different from `df.cache()`).
155. **How do you choose instance types?** Memory-optimised for joins/caching, compute-optimised for CPU transforms, storage-optimised for caching/Delta-heavy I/O, GPU for DL.
156. **Why are many small partitions bad, and too few also bad?** Many means task scheduling overhead and small files. Too few means poor parallelism, spill, and stragglers.
157. **How to optimise MERGE?** Liquid clustering on the key, predicates to prune target files, deletion vectors, de-duplicated source, low-shuffle merge (default).
158. **How to find expensive jobs?** `system.billing.usage` joined with `list_prices` grouped by `usage_metadata.job_id`, cluster tags, or warehouse.
159. **Autoscaling pitfalls?** Streaming with standard autoscaling is inefficient (use enhanced autoscaling or fixed size). Scale-down loses cached data.
160. **Photon trade-off?** Higher DBU rate, but usually a much faster runtime, so net cheaper for SQL/DataFrame-heavy workloads. Little benefit for UDF-heavy code.

### 25.10 Scenario-based (practise answering out loud)

161. **Design a pipeline for daily CSV drops from 14 systems (like the logistics dataset).** Land files in a UC Volume. Auto Loader (`availableNow`) to Bronze with audit columns. A metadata-driven Silver with typed schemas, DQ rules → quarantine + `dq_summary`, and FK checks. A Gold star schema + KPI marts. A Lakeflow Job with file-arrival trigger, alerts on DQ thresholds, an AI/BI dashboard + Genie, deployed via bundles.
162. **Source sends updates and deletes for customers; you need history.** Ingest CDC to Bronze and apply with `AUTO CDC ... STORED AS SCD TYPE 2` (or MERGE-based SCD2) into `dim_customer` with `valid_from/valid_to/is_current`.
163. **A dashboard query takes 40 s.** Check the query profile. Pre-aggregate into a Gold MV, cluster by filter columns, use a serverless warehouse with the right size, remove `SELECT *`, check for exploding joins.
164. **A join between a 2 TB fact and a 50 MB dimension is slow.** Ensure a broadcast join (hint or raise the threshold). Check for skew; filter early.
165. **One task runs 30 minutes while others take 30 seconds.** Skew. Find the hot key (`groupBy(key).count()`), rely on AQE skew join, salt, or process NULL/hot keys separately.
166. **Someone ran a bad UPDATE on a Gold table.** `DESCRIBE HISTORY` to find the version, then `RESTORE TABLE ... TO VERSION AS OF n`. Add constraints and access controls to prevent recurrence.
167. **Analysts must not see driver licence numbers or DOB.** Column masks/ABAC tags on PII columns in Silver. Grant analysts only Gold (which omits PII). Audit via `system.access.audit`.
168. **Streaming job's state keeps growing until OOM.** Add watermarks, use the RocksDB state store, bound dedupe with `dropDuplicatesWithinWatermark`, and review stateful operations.
169. **Build a daily machine-failure risk score (like the PdM dataset).** Bronze/Silver telemetry. Gold feature table with rolling windows, error counts, time since maintenance, age/model. Label = failure in the next 24h. Time-based split; GBT/XGBoost with class weights; MLflow + UC registry; a daily batch-scoring job writing `gold.machine_risk_scores`; a dashboard + alert; drift monitoring.
170. **Your nightly job costs doubled.** Use system billing tables to find which job/cluster. Check for all-purpose compute use, disabled auto-termination, data growth, disabled Photon/AQE, and small files; apply policies.
171. **You need to share Gold data with a partner on Snowflake.** Delta Sharing (open protocol), or UniForm/Iceberg REST catalog access. No copies; revocable.
172. **Late-arriving IoT events up to 2 hours.** Watermark of 2 hours for windowed aggregations; MERGE late events into Silver; recompute affected Gold windows (MVs handle this).
173. **Migrate an on-prem Hadoop/Hive ETL to Databricks.** Assess (UCX/scanners), move data to cloud storage as Delta, convert HiveQL/Spark jobs, UC for governance, Lakeflow Jobs for orchestration, validate with reconciliation, then cut over.
174. **You must guarantee a table never has negative miles.** `ALTER TABLE ADD CONSTRAINT CHECK (miles > 0)` plus Silver DQ rules/expectations routing violations to quarantine.
175. **Explain end-to-end what happens when you run `spark.table("gold.fact_trip").groupBy("route_id").sum("miles").show()`.** UC resolves the table and checks permissions. The Delta log gives the current snapshot's files. Catalyst prunes columns (only `route_id`, `miles`). A physical plan with partial aggregation → shuffle by `route_id` → final aggregation. Tasks run on executors (Photon if enabled). AQE coalesces partitions. The driver collects the top 20 rows for `show()`.

---

## 26. Cheat sheets

### 26.1 PySpark ↔ SQL

| Task | PySpark | SQL |
|---|---|---|
| Select/rename | `df.select("a", F.col("b").alias("c"))` | `SELECT a, b AS c` |
| Filter | `df.filter("x > 5")` | `WHERE x > 5` |
| New column | `df.withColumn("y", F.col("x") * 2)` | `SELECT *, x * 2 AS y` |
| Aggregate | `df.groupBy("k").agg(F.sum("v"))` | `SELECT k, sum(v) GROUP BY k` |
| Join | `a.join(b, "id", "left")` | `a LEFT JOIN b USING (id)` |
| Anti-join | `a.join(b, "id", "left_anti")` | `WHERE NOT EXISTS (...)` / `LEFT ANTI JOIN` |
| Dedupe | `df.dropDuplicates(["id"])` | `SELECT DISTINCT` / `QUALIFY row_number() ... = 1` |
| Window | `F.row_number().over(Window.partitionBy("k").orderBy("t"))` | `row_number() OVER (PARTITION BY k ORDER BY t)` |
| Pivot | `df.groupBy("k").pivot("m").sum("v")` | `PIVOT (sum(v) FOR m IN (...))` |
| Explode | `F.explode("arr")` | `explode(arr)` / `LATERAL VIEW` |
| Case | `F.when(c, v).otherwise(w)` | `CASE WHEN c THEN v ELSE w END` |
| Null handling | `F.coalesce(a, b)`, `df.na.fill(0)` | `coalesce(a, b)`, `nvl` |
| Safe cast | `F.expr("try_cast(x AS INT)")` | `try_cast(x AS INT)` |
| Dates | `F.date_trunc("month", "ts")` | `date_trunc('MONTH', ts)` |

### 26.2 Delta commands
```sql
DESCRIBE HISTORY t;  DESCRIBE DETAIL t;  DESCRIBE EXTENDED t;
SELECT * FROM t VERSION AS OF 3;  RESTORE TABLE t TO VERSION AS OF 3;
OPTIMIZE t;  OPTIMIZE t ZORDER BY (c);  ALTER TABLE t CLUSTER BY (c);  ALTER TABLE t CLUSTER BY AUTO;
VACUUM t RETAIN 168 HOURS;  ANALYZE TABLE t COMPUTE STATISTICS FOR ALL COLUMNS;
ALTER TABLE t ADD CONSTRAINT c CHECK (x > 0);  ALTER TABLE t SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
CREATE TABLE t2 SHALLOW CLONE t;  CONVERT TO DELTA parquet.`/path`;  UNDROP TABLE t;
MERGE INTO t USING s ON t.id = s.id WHEN MATCHED THEN UPDATE SET * WHEN NOT MATCHED THEN INSERT *;
```

### 26.3 Unity Catalog
```sql
CREATE CATALOG c; CREATE SCHEMA c.s; CREATE VOLUME c.s.v; CREATE TABLE c.s.t (...);
GRANT USE CATALOG ON CATALOG c TO `g`; GRANT USE SCHEMA, SELECT ON SCHEMA c.s TO `g`;
SHOW GRANTS ON TABLE c.s.t; ALTER TABLE c.s.t OWNER TO `g`;
ALTER TABLE c.s.t SET ROW FILTER f ON (col); ALTER TABLE c.s.t ALTER COLUMN col SET MASK m;
ALTER TABLE c.s.t SET TAGS ('pii' = 'true'); COMMENT ON TABLE c.s.t IS '...';
SELECT * FROM c.information_schema.tables; SELECT * FROM system.access.table_lineage;
```

### 26.4 Streaming skeleton
```python
(spark.readStream.format("cloudFiles").option("cloudFiles.format", "json")
   .option("cloudFiles.schemaLocation", schema_path).load(src)
 .writeStream.option("checkpointLocation", ckpt).trigger(availableNow=True).toTable("c.bronze.t"))
```

### 26.5 Most-used Spark configs
| Config | Purpose |
|---|---|
| `spark.sql.shuffle.partitions` | Post-shuffle partitions (default 200; `auto` on Databricks) |
| `spark.sql.adaptive.enabled` | AQE (default true) |
| `spark.sql.autoBroadcastJoinThreshold` | Max size to auto-broadcast (10 MB) |
| `spark.sql.files.maxPartitionBytes` | Input split size (128 MB) |
| `spark.databricks.delta.optimizeWrite.enabled` | Fewer, larger files on write |
| `spark.databricks.delta.autoCompact.enabled` | Compact small files after writes |
| `spark.sql.ansi.enabled` | ANSI SQL mode (errors on bad casts; use `try_cast`) |

### 26.6 CLI & bundles
```bash
databricks auth login --host https://<workspace-url>
databricks fs cp -r ./data/logistics dbfs:/Volumes/logistics/raw/landing
databricks bundle init | validate | deploy -t dev | run logistics_medallion -t dev | destroy
databricks jobs list; databricks jobs run-now <job_id>
```

---

## 27. Certifications & learning path

| Certification | Focus | Prepare with (chapters) |
|---|---|---|
| **Data Engineer Associate** | Spark SQL/PySpark, Delta, Medallion, Auto Loader, Declarative Pipelines, Jobs, UC basics | 6–16 |
| **Data Engineer Professional** | Advanced Delta, streaming, performance, CDC/SCD, testing & deployment, security, monitoring | 9–16, 20–23 |
| **Data Analyst Associate** | Databricks SQL, dashboards, Genie, SQL functions, UC permissions | 4, 16, 17 |
| **Machine Learning Associate / Professional** | MLflow, feature engineering, AutoML, Spark ML, serving, monitoring | 18 |
| **Generative AI Engineer Associate** | RAG, Vector Search, agents, evaluation, serving, governance | 19 |
| **Platform Administrator / Architect credentials** | Identity, networking, UC, cost | 3, 16, 21, 22 |

**Suggested 4-week plan**
* **Week 1:** Chapters 1–8 + create a Free Edition workspace and load the logistics CSVs into a Volume.
* **Week 2:** Chapters 9–13 + run the logistics notebooks 01–04 and read every cell; explain each design decision out loud.
* **Week 3:** Chapters 14–17 + build the Declarative Pipeline version, a job, a dashboard and a Genie space on `logistics.gold`.
* **Week 4:** Chapters 18–23 + run the PdM notebooks, register a model in UC, then drill the 175 interview questions.

*Official resources:* Databricks documentation (docs.databricks.com), Databricks Academy (free self-paced courses), "Delta Lake: The Definitive Guide", "Learning Spark (2nd ed.)", and the Databricks blog for new features.
