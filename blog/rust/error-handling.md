---
title: Rust Error Handling in 5 Minutes
date: 2025-11-24
description: Result, Option, and the ? operator—everything you need to know.
---

# Rust Error Handling in 5 Minutes

Coming from other languages, Rust's error handling feels weird at first. No exceptions. No try/catch. Just types.

But once it clicks, you'll never want to go back.

---

## The Two Types

Rust has two types for "something might not be there":

### `Option<T>` — Maybe there's a value

```rust
fn find_user(id: u64) -> Option<User> {
    // Returns Some(user) or None
}
```

Use when absence is *normal*, not exceptional. "User might not exist" is fine.

### `Result<T, E>` — Success or failure

```rust
fn read_file(path: &str) -> Result<String, io::Error> {
    // Returns Ok(contents) or Err(error)
}
```

Use when something can *fail*. File not found, network error, parse failure.

---

## Handling Them

The verbose way:

```rust
match read_file("config.toml") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Failed: {}", e),
}
```

The pragmatic way:

```rust
// Unwrap: crash if error (fine for prototypes)
let contents = read_file("config.toml").unwrap();

// Expect: crash with a message
let contents = read_file("config.toml")
    .expect("config.toml should exist");

// Default value
let contents = read_file("config.toml")
    .unwrap_or_default();
```

---

## The `?` Operator

This is where Rust shines. The `?` operator propagates errors automatically:

```rust
fn load_config() -> Result<Config, io::Error> {
    let contents = read_file("config.toml")?;  // Returns early if Err
    let config = parse_toml(&contents)?;       // Same here
    Ok(config)
}
```

That `?` means: "If this is `Err`, return it from the function. Otherwise, unwrap the `Ok`."

It's like exceptions, but explicit. You see every point where errors can happen.

---

## Converting Between Error Types

Real code has multiple error types. Use `map_err` or the `anyhow` crate:

```rust
// With map_err
fn load_config() -> Result<Config, String> {
    let contents = read_file("config.toml")
        .map_err(|e| e.to_string())?;
    Ok(parse(contents))
}

// With anyhow (recommended for applications)
use anyhow::Result;

fn load_config() -> Result<Config> {
    let contents = read_file("config.toml")?;
    let config = parse(&contents)?;
    Ok(config)
}
```

---

## The Cheat Sheet

| Situation | Use |
|-----------|-----|
| Value might not exist | `Option<T>` |
| Operation can fail | `Result<T, E>` |
| Prototype/script | `.unwrap()` |
| Production code | `?` operator |
| Multiple error types | `anyhow` crate |
| Library code | Custom error enum |

---

## That's It

No try/catch. No null pointers. No "exception thrown somewhere up the stack."

Just types that force you to handle the unhappy path.

It's more typing upfront. It's less debugging at 3am.

Worth it.

---

*Now go make some `Result`s.* 🦀
