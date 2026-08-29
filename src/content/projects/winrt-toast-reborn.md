---
title: "winrt-toast-reborn"
tagline: "Idiomatic Windows Toast Notification Library for Rust"
description: "A comprehensive Rust binding to the Windows ToastNotification API supporting rich text placements, hero/logo images, interactive action callbacks, input selections, audio cues, and custom AppID registration."
featured: true
order: 3
category: "Systems & Native"
role: "Maintainer & Author"
period: "2024 - Present"
stack:
  - "Rust"
  - "WinRT"
  - "Windows API"
  - "COM"
  - "XML Schema"
githubUrl: "https://github.com/AtifChy/winrt-toast-reborn"
liveUrl: "https://crates.io/crates/winrt-toast-reborn"
stats:
  "Ecosystem": "Crates.io & Docs.rs"
  "API Design": "Fluent Builder Pattern"
  "Interactivity": "Actions, Inputs, Selections"
  "License": "MIT License"
keyHighlights:
  - "Modernized fork of kdeconnect-rs/winrt-toast, providing maintained bindings for the Windows ToastNotification API."
  - "Supports rich toast layouts: multi-line text, attribution labels, hero images, and circular cropped logo overrides."
  - "Enables deep interactivity with button actions, text input fields, and dropdown selection pickers."
  - "Provides event handling, audio sound effects, notification scenarios (alarm, reminder, urgent), and toast removal by tag/group."
  - "Includes built-in app registration helper (`register()`) for creating custom Application User Model IDs (AUMIDs) with unique icons."
architectureDecisions:
  - decision: "Idiomatic Rust Builder Pattern"
    rationale: "Encapsulates complex Windows WinRT XML schemas and COM initialization into safe, readable, compile-time checked Rust structures."
  - decision: "Direct WinRT API Integration"
    rationale: "Uses native Windows runtime interfaces directly, eliminating dependencies on external PowerShell processes or C++ shims."
---

## Overview

**`winrt-toast-reborn`** is a native Rust library providing full-featured access to the Windows `ToastNotification` system for Windows 10 and 11. It originated as a modernized fork of `kdeconnect-rs/winrt-toast` to provide the Rust ecosystem with an actively maintained, ergonomic toast notification crate.

## Code Examples

### 1. Basic Toast Notification

```rust
use winrt_toast_reborn::{Toast, Text, Header, ToastManager};
use winrt_toast_reborn::content::text::TextPlacement;

fn main() {
    let manager = ToastManager::new(ToastManager::POWERSHELL_AUM_ID);

    let mut toast = Toast::new();
    toast
        .text1("Build Complete")
        .text2(Text::new("Astro 7 static portfolio build finished."))
        .text3(
            Text::new("Via Portfolio CI")
                .with_placement(TextPlacement::Attribution)
        );

    manager.show(&toast).expect("Failed to show toast");
}
```

### 2. Rich Toast with Hero Images & Action Buttons

```rust
use winrt_toast_reborn::{Toast, Text, Image, Action, ToastManager, ToastDuration};
use winrt_toast_reborn::content::image::{ImagePlacement, ImageHintCrop};
use std::path::Path;

fn main() -> winrt_toast_reborn::Result<()> {
    let manager = ToastManager::new(ToastManager::POWERSHELL_AUM_ID);

    let hero_image = Image::new_local(Path::new("hero.jpg"))?
        .with_placement(ImagePlacement::Hero);

    let logo_image = Image::new_local(Path::new("logo.png"))?
        .with_placement(ImagePlacement::AppLogoOverride)
        .with_hint_crop(ImageHintCrop::Circle);

    let mut toast = Toast::new();
    toast
        .text1("Meeting Reminder")
        .text2("Engineering sync starts in 5 minutes")
        .text3("Conference Room A")
        .image(1, hero_image)
        .image(2, logo_image)
        .duration(ToastDuration::Long)
        .action(Action::new("Join", "join_meeting", "meeting_id=123"))
        .action(Action::new("Snooze", "snooze", ""));

    manager.show(&toast)?;
    Ok(())
}
```

### 3. Interactive Inputs & Selections

```rust
use winrt_toast_reborn::{Toast, Input, Selection, Action, ToastManager};
use winrt_toast_reborn::content::input::InputType;

fn main() -> winrt_toast_reborn::Result<()> {
    let manager = ToastManager::new(ToastManager::POWERSHELL_AUM_ID);

    let mut toast = Toast::new();
    toast
        .text1("Quick Reply")
        .text2("Choose your response:")
        .input(
            Input::new("response", InputType::Selection)
                .with_title("Select option")
                .with_default_input("yes")
        )
        .selection(Selection::new("yes", "Yes"))
        .selection(Selection::new("no", "No"))
        .selection(Selection::new("maybe", "Maybe later"))
        .action(Action::new("Send", "send_response", "").with_input_id("response"));

    manager.show(&toast)?;
    Ok(())
}
```

### 4. Custom App Registration

```rust
use winrt_toast_reborn::register;
use std::path::Path;

fn main() -> winrt_toast_reborn::Result<()> {
    // Register unique App User Model ID with Windows
    register(
        "AtifChy.Portfolio.Daemon",
        "Portfolio Daemon",
        Some(Path::new("C:\\path\\to\\icon.ico")),
    )?;

    let manager = ToastManager::new("AtifChy.Portfolio.Daemon");
    let mut toast = Toast::new();
    toast.text1("Registered Application");
    manager.show(&toast)?;
    Ok(())
}
```

## Feature Matrix

- **Rich Content**: Multi-line headers, hero banners, app logo circular crops, attribution labels.
- **Interactive Elements**: Buttons, inline text inputs, and single-selection dropdowns.
- **Event Handling**: Callback hooks for activation, dismissal, and delivery failures.
- **Audio Cues**: Customizable system audio cues and sound themes.
- **Scenarios**: Alarm, Reminder, Incoming Call, and Urgent priority scenarios.
- **Toast Management**: Granular dismissal and clearance by tag or group ID.
- **AUMID Registration**: Simple Windows shell registration for branded desktop notifications.
