# NFT Marketplace (Ultraverse)

## Description

An online NFT marketplace built with React and CSS, where users can explore and purchase NFTs. The platform dynamically pulls NFT data from an API and displays essential details like title, owner, creator, prices, likes, and a countdown timer for active sales. The marketplace also features an Explore page displaying all available NFTs and an Info page providing detailed information for each individual NFT.

## Table of Contents

- [Description📝](#description)
- [Features✨](#features)
- [Tech Stack🛠️](#tech-stack)
- [Screenshots 📸](#screenshots)
- [Code Highlights🔍](#code-highlights)
- [Installation🛠️](#installation)
- [Future Improvements🛠️](#future-improvements)
- [Contributing🤝](#contributing)
- [Contact📧](#contact)
- [License⚖️](#license)

## Features

- Dynamic Data Fetching: NFTs are fetched in real-time from an external API.
- NFT Explore Page: View and explore all available NFTs in a dedicated page.
- NFT Info Page: Access detailed information for individual NFTs.
- Sales Timer: A countdown timer for NFTs on sale.
- Interactive Animations: Enhanced user experience with animations.
- Filtering Options: Filter NFTs by attributes such as price, popularity, etc.

## Tech Stack

React: For building the user interface and managing application state.

CSS: For styling the components and animations.

API Integration: Fetches data for NFTs from an external API.


## Screenshots

<img width="548" alt="Ultraverse Home" src="https://github.com/user-attachments/assets/9e464caa-d5ce-4f0b-aaf4-bf934059312c" />

<img width="547" alt="NFT's" src="https://github.com/user-attachments/assets/23fd49ca-5021-4943-b968-08090239f96d" />

<img width="528" alt="Explore NFT's" src="https://github.com/user-attachments/assets/5ea5ccee-f509-47ab-89d7-f956c3ed1918" />

<img width="522" alt="NFT Info" src="https://github.com/user-attachments/assets/98485c2c-e0b2-4b5a-bedc-f92c9cab1c61" />


## Code Highlights

### 1. Fetching Data
This snippet demonstrates how the app dynamically fetches NFT data from an API and updates the UI
```javascript
const ExploreItems = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const [exploreData, setExploreData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slice, setSlice] = useState(8);

  useEffect(() => {
    const getExploreData = async () => {
      const { data } = await axios.get(dataURL);
      setExploreData(data);
      setIsLoaded(true);
    };

    getExploreData();
  }, []);

  const filterNfts = async (event) => {
    const filterValue = event.target.value;
    const { data } = await axios.get(`${dataURL}?filter=${filterValue}`);
    setExploreData(data);
  };
};
```
### 2. Animations
Animations are implemented using AOS (Animate On Scroll) for smooth transitions:
```javascript
<div data-aos="fade-up"></div>
```

### 3. Timer Component
The timer component dynamically calculates and displays the time remaining for an NFT sale:
```javascript
import React, { useEffect, useRef, useState } from "react";

function Timer({ expiryDate }) {
  const [countDown, setCountDown] = useState("");
  const intervalId = useRef(null);

  const updateCountdown = () => {
    const currentTime = Date.now();
    const timeRemaining = expiryDate - currentTime;
    if (timeRemaining < 1) {
      setCountDown("Expired");
      clearInterval(intervalId.current);
    } else {
      const nftExpiryDateSecs = Math.floor((timeRemaining / 1000) % 60);
      const nftExpiryDateMinutes = Math.floor(timeRemaining / 1000 / 60) % 60;
      const nftExpiryDateHours = Math.floor(timeRemaining / 1000 / 60 / 60);
      setCountDown(
        `${nftExpiryDateHours}h ${nftExpiryDateMinutes}m ${nftExpiryDateSecs}s`
      );
    }
  };

  useEffect(() => {
    intervalId.current = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(intervalId.current);
  }, []);

  return <div>{countDown}</div>;
}

export default Timer;
```

## Installation
### 1. Clone the repository:

```bash
git clone https://github.com/KnightRider-13/Internship.git
```
### 2. Install dependencies: 
  ```bash
   npm install
  ```
 
### 3. Start the development server: 
  ```bash
   npm start
  ```
This will open the application in your browser at http://localhost:3000.

## Future Improvements
Add more filtering options, such as pricing or ratings.

Include a contact form with backend support.

## Contributing

Contributions are welcome! To contribute: 

Fork the repository. 

Create a new branch (git checkout -b feature/YourFeature). 

Commit your changes (git commit -m 'Add YourFeature'). 

Push to the branch (git push origin feature/YourFeature). 

Create a pull request. 

## Contact
Ismaa'eel – www.linkedin.com/in/ismaaeel-fahmay – fahmay17@gmail.com

## License
This project does not have a license. If you'd like to use the code, please contact me for permission.
