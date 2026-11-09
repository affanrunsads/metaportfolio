import asyncio
import time
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Load local HTML file
        file_path = f"file://{os.path.abspath('index.html')}"
        await page.goto(file_path)

        # Give it a moment to load and attach listeners
        await asyncio.sleep(1)

        # Measure time taken to process 10,000 rapid mousemove events
        print("Starting benchmark...")

        # We will dispatch events from within the page context to avoid RPC overhead
        # and measure how long it takes the browser to process them

        script = """
        async () => {
            const numEvents = 5000;
            const start = performance.now();

            for (let i = 0; i < numEvents; i++) {
                const event = new MouseEvent('mousemove', {
                    clientX: Math.random() * window.innerWidth,
                    clientY: Math.random() * window.innerHeight,
                    bubbles: true
                });
                window.dispatchEvent(event);
            }

            // Force a layout/paint by querying a style
            document.body.offsetHeight;

            return performance.now() - start;
        }
        """

        time_taken = await page.evaluate(script)

        print(f"Time taken for 5000 mousemove events: {time_taken:.2f} ms")

        with open("benchmark_baseline.txt", "w") as f:
            f.write(str(time_taken))

        await browser.close()

asyncio.run(main())
