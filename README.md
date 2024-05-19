##Tech task for Teacher Cloud

Interpreted requirements as an imaginary dashboard for tracking product trends on social media. Bar chart plots frequency of product categories. Latest images and videos on Flickr for current category shown in media feed. Clicking on a bar in the chart changes the category, updating the media feed with related images and videos.

Used Vite for tooling
https://vitejs.dev

Used Tanstack Query for API calls and asynchronous state management
https://tanstack.com/query/latest

Used flickr.photos.search endpoint to return images and videos
https://www.flickr.com/services/api/explore/flickr.photos.search

Used Recharts for data visualisation
https://recharts.org/en-US/

Used NextUI and Tailwind CSS for UI and styling
https://nextui.org
https://tailwindcss.com

Deployed to Vercel
https://vercel.com

#Notes
- Dummyjson API call always returns a value of 5 for all product categories
- Recharts throws two console warnings, known issue, non-blocking

#Possible improvements
- Make chart responsive, bars could plot left to right for mobile
- Make grid responsive

