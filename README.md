# PERIHELION VIGIL // DEVLOG

Jekyll source for the Perihelion Vigil development log.

Live site: https://winterunmute.github.io/perihelion-vigil-devlog/

## What this is

A static devlog for **Perihelion Vigil**, a PS1-era space RPG built by one
person. Phosphor-green-on-black terminal aesthetic. Posts are markdown files in
`_posts/`. Push to `main` = publish.

## Local preview

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/perihelion-vigil-devlog/

## Writing a post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md` with front matter:

```yaml
---
layout: post
title: "Your title"
date: 2026-06-12
tags: [design, vm]
excerpt: "One-line hook shown in the log list."
---
```

Drop any images for a post in `assets/media/post-N/`.

## Structure

```
_config.yml          site config
Gemfile              github-pages + plugins
index.html           transmission log (post list)
about.md             about page
_layouts/            default + post templates
assets/css/main.css  phosphor terminal theme
assets/media/        per-post image folders
_posts/              the logs
```
