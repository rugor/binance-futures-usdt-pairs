<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate and Download USDT Pairs</title>
</head>
<body>
    <h1>Generate and Download USDT Pairs</h1>
    <button id="download-btn">Download usdt_pairs.txt</button>

    <script>
        document.getElementById('download-btn').addEventListener('click', async function() {
            try {
                // Fetch trading pairs from Binance Futures API
                const response = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo');
                const data = await response.json();
                const symbols = data.symbols;

                // Filter and format USDT pairs
                const usdtPairs = symbols
                    .filter((symbol) => symbol.symbol.endsWith('USDT'))
                    .map((symbol) => `BINANCE:${symbol.symbol}PERP`);

                // Create a Blob from the file content
                const blob = new Blob([usdtPairs.join('\n')], { type: 'text/plain' });

                // Create a link element
                const link = document.createElement('a');

                // Set the download attribute with a filename
                link.download = 'usdt_pairs.txt';

                // Create a URL for the Blob and set it as the href attribute
                link.href = window.URL.createObjectURL(blob);

                // Append the link to the body
                document.body.appendChild(link);

                // Programmatically click the link to trigger the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error fetching trading pairs:', error);
            }
        });
    </script>
</body>
</html>