function parseData() {
    // Fetch all quote and author elements
    let quotes = document.getElementsByTagName("quote");
    let authors = document.getElementsByTagName("author");

    // Prepare a variable to store the output
    let output = "";

    // Loop through the quotes and authors and append them to the output
    for (let i = 0; i < quotes.length; i++) {
        output += `<p><strong>Quote:</strong> ${quotes[i].textContent}</p>`;
        output += `<p><strong>Author:</strong> ${authors[i].textContent}</p><hr>`;
    }

    // Display the output in the div
    document.getElementById("output").innerHTML = output;
}

function loadXMLFile() {
    var proxy = "https://corsproxy.io/?";
    var targetUrl = "https://iceberg-cycle.codio.io/5:%20Asynchronous%20JavaScript%20(AJAX)/famous-quotes.xml";
    
    fetch(proxy + encodeURIComponent(targetUrl))
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");

            var quotes = xmlDoc.getElementsByTagName("quote");
            var authors = xmlDoc.getElementsByTagName("author");

            var output = "";
            for (var i = 0; i < quotes.length; i++) {
                var quoteText = quotes[i].textContent;
                var authorText = authors[i].textContent;
                output += `"${quoteText}" - ${authorText}<br><br>`;
            }

            document.getElementById("quotes").innerHTML = output;
        })
        .catch(error => console.error('Error fetching the resource:', error));
}

function loadAndParseXML() {
    var proxy = "https://corsproxy.io/?";
    var targetUrl = "https://iceberg-cycle.codio.io/5:%20Asynchronous%20JavaScript%20(AJAX)/famous-quotes.xml";
    
    fetch(proxy + encodeURIComponent(targetUrl))
        .then(response => response.text()) // Get the raw XML as text
        .then(data => {
            // Parse the text as an XML document
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");

            // Extract the <quote> and <author> elements
            var quotes = xmlDoc.getElementsByTagName("quote");
            var authors = xmlDoc.getElementsByTagName("author");

            // Prepare the table content by appending rows after the initial row
            var tableBody = document.getElementById("tabledata");

            // Loop through the quotes and authors, and append rows to the existing table
            for (var i = 0; i < quotes.length; i++) {
                var quoteText = quotes[i].textContent;
                var authorText = authors[i].textContent;

                // Create new row
                var row = document.createElement("tr");

                // Create and append quote cell
                var quoteCell = document.createElement("td");
                quoteCell.style.width = '300px';
                quoteCell.textContent = quoteText;
                quoteCell.style.paddingBottom = '20px'
                quoteCell.style.paddingRight = '30px'
                row.appendChild(quoteCell);

                // Create and append author cell
                var authorCell = document.createElement("td");
                authorCell.textContent = authorText;
                authorCell.style.paddingBottom = '20px'
                row.appendChild(authorCell);

                // Append the new row to the existing table body
                tableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching the resource:', error));
}

function loadAndParseNews(feedUrl, sourceName) {
    var proxy = "https://corsproxy.io/?";

    fetch(proxy + encodeURIComponent(feedUrl))
        .then(response => response.text())
        .then(data => {
            // Parse the RSS feed XML
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");

            // Get all <item> elements (each news article is within an <item> tag)
            var items = xmlDoc.getElementsByTagName("item");

            // Clear the existing newsfeed content
            var newsTable = document.getElementById("newsfeed");
            newsTable.innerHTML = "";

            // Create table element
            var table = document.createElement("table");

            // Set CSS directly using JavaScript for the table
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";

            // Create table headers for the news feed, including the source name (YAHOO or ILTALEHTI)
            var tableHeader = `
                <thead>
                    <tr>
                        <th style="padding: 10px; text-align: left;">${sourceName}'s News Title</th>
                    </tr>
                </thead>
            `;
            table.innerHTML = tableHeader;

            // Create the table body
            var tableBody = document.createElement("tbody");

            // Loop through each item and create a table row for each news entry
            for (var i = 0; i < items.length; i++) {
                var title = items[i].getElementsByTagName("title")[0].textContent;
                var link = items[i].getElementsByTagName("link")[0].textContent;

                // Create a new row for each news item
                var row = document.createElement("tr");

                // Create a cell for the news title
                var titleCell = document.createElement("td");

                // Add the bullet point outside the anchor tag
                var bullet = document.createTextNode("• ");

                // Create the anchor for the news title
                var anchor = document.createElement("a");
                anchor.href = link;
                anchor.textContent = title;
                anchor.target = "_blank"; // Opens the link in a new tab

                // Add the bullet point and the anchor to the table cell
                titleCell.appendChild(bullet);
                titleCell.appendChild(anchor);
                titleCell.style.padding = "5px, 0";
                titleCell.style.textAlign = "left";

                // Append the cell to the row
                row.appendChild(titleCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            }

            // Append the table body to the table
            table.appendChild(tableBody);

            // Append the table to the newsfeed div
            newsTable.appendChild(table);
        })
        .catch(error => console.error('Error fetching the newsfeed:', error));
}
