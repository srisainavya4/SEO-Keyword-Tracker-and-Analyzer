import React, { useState } from 'react';
import cheerio from 'cheerio';

function WebsiteDataReader() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      if (!url) {
        console.error('URL is required');
        return;
      }

      const response = await fetch(`http://localhost:3001/fetch-data?url=${url}`);
      if (response.ok) {
        const htmlData = await response.text();
        console.log(htmlData);

        // Assuming you want to display the data as paragraphs:
        const $ = cheerio.load(htmlData); // Load the HTML using cheerio
        const paragraphs = [];
        $('p').each((index, element) => {
          paragraphs.push($(element).text()); // Extract text content of each paragraph
        });
        setData(paragraphs.join('\n')); // Join the paragraphs with line breaks
      } else {
        console.error('Server responded with an error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  return (
    <div>
      <h1>Website Data Reader</h1>
      <input
        type="text"
        placeholder="Enter Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        <h2>Extracted Data</h2>
        <p dangerouslySetInnerHTML={{ __html: data }}></p>
      </div>
    </div>
  );
}

export default WebsiteDataReader;
