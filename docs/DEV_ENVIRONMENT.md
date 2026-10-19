# Local environment notes

## Duplicate " 2" files (iCloud)
`~/Documents` on this Mac is an iCloud Drive "Desktop & Documents" folder (extended attribute `com.apple.file-provider-domain-id: com.apple.CloudDocs.iCloudDriveFileProvider`). Files that are written, deleted and rewritten quickly get conflict copies such as `routes.d 2.ts`.

Evidence (16 Oct 2026):
- In this folder: 128 duplicate files accumulated in `.next` and 61 in `docs/screenshots`. None in `src`, `public` or `node_modules` so far.
- In a non-synced copy (APFS clone of the project in a temporary folder): three consecutive `next build` runs produced **0** duplicates, and `tsc --noEmit` passed with no exclusion.

So the cause is the synced folder, not the project. The `exclude` entry added to `tsconfig.json` (`.next/**/* ?.ts`) only stops TypeScript tripping over duplicated generated type files. It hides the symptom in one place; duplicates still appear in `.next` and in generated screenshots, and a source file edited at the wrong moment could be affected too.

Recommendation (not done, needs your decision): move the working copy to a folder iCloud does not sync, for example `~/Developer/namokar-eye-care`, then delete the `exclude` line from `tsconfig.json`. Nothing has been moved or deleted outside generated output. To clear generated duplicates: `find .next -name "* [0-9]*" -delete`.

## Stale or missing build files (18 Oct 2026)
Beyond the " 2" duplicates, iCloud was seen **deleting rebuilt files late**: after `rm -rf .next` and a rebuild, build chunks whose content hash did not change (so the file name was reused) were removed a few minutes later, and a running `next start` then answered 500 for those chunks. `rm -rf .next` also failed with "Directory not empty" while iCloud was syncing. For trustworthy test results, copy the project to a folder outside iCloud (for example `cp -Rc` into /tmp, which is cheap on APFS) and build and test there. Moving the project out of iCloud (see above) removes the problem; it has not been done without your approval.
