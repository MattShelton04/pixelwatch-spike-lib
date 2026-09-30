# pixelwatch-spike-lib

Throwaway spike for PixelWatch M0.5 (spike S4, reusable-workflow self-checkout). Not a product.
Synthetic data only. Do not depend on this repository.

- `.github/workflows/report.yml`: reusable workflow. Each job checks out
  `job.workflow_repository`@`job.workflow_sha` and runs `./_pixelwatch/actions/publish`.
- `.github/workflows/outer.yml`: reusable workflow that calls `report.yml` locally (nested call).
- `.github/workflows/selfref.yml`, `outer-dollar.yml`: the same through GitHub's `uses: $/...`
  self-repository syntax (no checkout).
- `.github/workflows/naive.yml`: negative control. Runs `./actions/publish` from the caller's
  checkout, which is what the self-checkout prevents.
- `.github/workflows/guard-selftest.yml`: the guard must fail on blank or moving-ref fields.
- `actions/publish/dist/index.js`: the "bundle". Prints its version, nonce and SHA-256.

The caller is https://github.com/MattShelton04/pixelwatch-spike-app.
