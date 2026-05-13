# NovaUI 🚀

Modern JavaScript UI library for alerts, confirms, forms and notifications.

Lightweight alternative to SweetAlert2 with glassmorphism UI.

---

# 📦 Installation

## 🌐 CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MDotstream/NovaUI/nova.css">
<script src="https://cdn.jsdelivr.net/gh/MDotstream/NovaUI/nova.js"></script>
```

# 🚀 Basic Usage

## 🪟 Alert
```javascript
Nova.show({
  title: "Hello",
  message: "This is an alert",
  icon: "info",
  buttonText: "OK"
});
```
# 🎯 Prebuilt Alerts (Shortcuts)

## 🟢 Success
```javascript
Nova.show({
  title: "Success",
  message: "Your action was completed",
  icon: "success",
  buttonText: "OK"
});
```

## 🔴 Error
```javascript
Nova.show({
  title: "Error",
  message: "Something went wrong",
  icon: "error",
  buttonText: "Retry"
});
```

## 🟡 Warning
```javascript
Nova.show({
  title: "Warning",
  message: "Be careful with this action",
  icon: "warning",
  buttonText: "OK"
});
```

## 🔵 Info
```javascript
Nova.show({
  title: "Info",
  message: "Here is some information",
  icon: "info",
  buttonText: "OK"
});
```

# ❌ Confirm

## Yes / No
```javascript
const result = await Nova.confirm({
  title: "Delete item?",
  message: "This action cannot be undone",
  confirmText: "Yes",
  cancelText: "No"
});

if (result) {
  console.log("Confirmed");
} else {
  console.log("Cancelled");
}
```

# 🧾 Input Form

## ✏️ Text input
```javascript
const name = await Nova.show({
  title: "Your name",
  message: "Enter your name",
  input: "text",
  placeholder: "John Doe",
  buttonText: "Submit"
});
```
## 📋 Select
```javascript
const country = await Nova.show({
  title: "Choose country",
  input: "select",
  options: [
    { value: "fr", label: "France" },
    { value: "us", label: "USA" }
  ],
  buttonText: "Confirm"
});
```

## 📝 Textarea
```javascript
const message = await Nova.show({
  title: "Message",
  input: "textarea",
  placeholder: "Write something..."
});
```

# 🎯 Toast Shortcuts

## 🟢 Success
```javascript
Nova.notify({
  title: "Success",
  message: "Operation completed",
  type: "success"
});
```

## 🔴 Error
```javascript
Nova.notify({
  title: "Error",
  message: "Something failed",
  type: "error"
});
```

## 🟡 Warning
```javascript
Nova.notify({
  title: "Warning",
  message: "Check your input",
  type: "warning"
});
```

## 🔵 Info
```javascript
Nova.notify({
  title: "Info",
  message: "New update available",
  type: "info"
});
```

# 🎨 UI Design
- Glassmorphism blur effect
- Smooth animations
- SVG icons
- Mobile responsive
- Modern SaaS style

#📱 Responsive
- Desktop → top right notifications
- Mobile → centered top notifications
- Modal → centered always

# 🚀 Roadmap
- Nova.prompt()
- Queue system (stack modals)
- Spring animations
