# NovaUI 🚀

Modern JavaScript UI library for alerts, confirms, forms and notifications.

Lightweight alternative to SweetAlert2 with glassmorphism UI.

---

# 📦 Installation

## 🌐 CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/NovaUI@1.0.0/nova.css">
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/NovaUI@1.0.0/nova.js"></script>
```

#🚀 Basic Usage

##🪟 Alert
```javascript
Nova.show({
  title: "Hello",
  message: "This is an alert",
  icon: "info",
  buttonText: "OK"
});
```
#🎯 Prebuilt Alerts (Shortcuts)

##🟢 Success
```javascript
Nova.show({
  title: "Success",
  message: "Your action was completed",
  icon: "success",
  buttonText: "OK"
});
```

##🔴 Error
```javascript
Nova.show({
  title: "Error",
  message: "Something went wrong",
  icon: "error",
  buttonText: "Retry"
});
```
