# [Daily Sleep Tracker](https://sleep-tracker-web.herokuapp.com/landing)

![app](https://user-images.githubusercontent.com/102754713/167021526-b0daadcf-f26a-46c9-90e5-aa4762e617a5.png)


**Project inspired by**
## [Codementor Page](https://www.codementor.io/projects/web/daily-sleep-tracker-web-app-byi4kpk5rt)

## Introduction

- Web App for tracking your sleep cycles.

## Requirements

- Splash Screen: When a user is not logged in, show the homepage with an introduction of the app and how it can help users track their sleep better.
- Signup page: Use Google or Facebook libraries or implement your own authentication module.
- Login page: a user should be able to login to the account using their signup method.
- New user login: show an empty page with the “New entry” button. Once the user clicks “New entry,” show a modal dialogue/popup:
- Select date using date picker
- Select sleep time in hour and minutes
- Select wakeup time in hour and minutes
- Calculate total sleep duration
- Include reset, cancel, and submit buttons
- Old user logs in: show a list of entries for the last 7 days or 1 month
- The list should include: date, time of sleep, wake up time, and sleep duration
- Use graph libraries to show a floating bar chart with the Y axis as the sleep duration and X axis as dates
- Show a “new entry” button

## Installation

required ENV's:  
`JWT_SECRET` - JWT Secret Key  
`MONGO_URI` - Mongo DB URI

```bash
npm install

# start the application
npm run dev
```


