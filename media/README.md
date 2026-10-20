# Mobile app images

Put image files for the mobile app in this folder. Keep filenames simple and
use lowercase names, for example `sanctuary-hero.jpg`. Subfolders are
supported.

Supported formats: AVIF, GIF, JPEG, PNG, SVG, and WebP. WebP or JPEG is a good
choice for photographs; PNG is useful when transparency is needed.

Import each image statically so Metro can bundle it into the app. From a screen
under `apps/mobile/app/`, use a path such as:

```tsx
import sanctuaryHero from '../../media/sanctuary-hero.jpg'

<Image source={sanctuaryHero} contentFit="cover" />
```

Use the matching file extension and keep the import path literal; Metro must
know image paths at build time. The mobile Metro configuration watches the
repository root so files in this folder are available to the app. After adding
an image, reference it from the screen where it should appear.
