### Folder structure
+ /app: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
+ /app/lib: Contains functions used in your application, such as reusable utility functions and data fetching functions.
+ /app/ui: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
+ /public: Contains all the static assets for your application, such as images.
+ /scripts: Contains a seeding script that you'll use to populate your database in a later chapter.
+ Config Files: You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.

### CSS Styling
/app/ui/global.css: use this file to add CSS rules to all the routes in the application. You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component.
Currently, we are using `@tailwind` directives.  
Learn more at: https://tailwindcss.com/  

### CSS Modules
Inside /app/ui, create a new file called home.module.css and add the following CSS rules:  
```
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```
Then, inside your /app/page.tsx file import the styles and replace the Tailwind class names from the <div> you've added with styles.shape:  
```
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
 
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
    // ...
  )
}
```

### Using the clsx library to toggle class names
clsx is a library that lets you toggle class names easily.  
```
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

### Fonts
Next.js automatically optimizes fonts in the application when you use the next/font module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.  
How does Next.js optimize fonts?  
Next.js downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.  

In your /app/ui folder, create a new file called fonts.ts. You'll use this file to keep the fonts that will be used throughout your application.
Import the Inter font from the next/font/google module - this will be your primary font. Then, specify what subset you'd like to load. In this case, 'latin':  
```
import { Inter } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
```  
Finally, add the font to the <body> element in /app/layout.tsx:  
```
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```  
Read more:  
+ https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts  
+ https://nextjs.org/docs/app/building-your-application/optimizing/fonts  

### Optimize images?
Next.js can serve static assets, like images, under the top-level /public folder. Files inside /public can be referenced in your application.  
With regular HTML, you would add an image as follows:  
```
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```
However, this means you have to manually:  
- Ensure your image is responsive on different screen sizes. 
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.
Image Optimization is a large topic in web development that could be considered a specialization in itself. Instead of manually implementing these optimizations, you can use the next/image component to automatically optimize your images.  

__The <Image> component__
The <Image> Component is an extension of the HTML <img> tag, and comes with automatic image optimization, such as:
- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.

In your /app/page.tsx file, import the component from next/image. Then, add the image under the comment:  
```
...
import Image from 'next/image';
 
export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
    //...
  );
}
```
_*The class hidden to remove the image from the DOM on mobile screens, and md:block to show the image on desktop screens._

> True or False: Images without dimensions and web fonts are common causes of layout shift.
Read more:  
+ https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia
+ https://nextjs.org/docs/app/building-your-application/optimizing/images

## Layouts and Pages
One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering.  
What is the purpose of the layout file in Next.js?  
To share UI across multiple pages  
The layout file is the best way to create a shared layout that all pages in your application can use.  

### Navigation
In Next.js, you can use the <Link /> Component to link between pages in your application. <Link> allows you to do client-side navigation with JavaScript.  
To use the <Link /> component, open /app/ui/dashboard/nav-links.tsx, and import the Link component from next/link. Then, replace the `<a>` tag with `<Link>`:  
```
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
 
// ...
 
export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```
Automatic code-splitting and prefetching  
To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA
, where the browser loads all your application code on initial load.  
Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work.  
Furthermore, in production, whenever `<Link>` components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!  
Learn more about how [navigation works](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works.)

>Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!


### Deciding where to place your Suspense boundaries
Where you place your Suspense boundaries will depend on a few things:  
1. How you want the user to experience the page as it streams.  
2. What content you want to prioritize.  
3. If the components rely on data fetching.  
Take a look at your dashboard page, is there anything you would've done differently?  
Don't worry. There isn't a right answer.  
1. You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
2. You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
3. You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.
Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.  
Don't be afraid to experiment with Suspense and see what works best, it's a powerful API that can help you create more delightful user experiences.  