/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, getPackageJsonDependency } from '../../utility/dependencies';
import { latestVersions } from '../../utility/latest-versions';

export function updateDependencies() {
  return (host: Tree) => {
    const dependenciesToUpdate: Record<string, string> = {
      '@angular/pwa': '^0.803.9',
      '@angular-devkit/build-angular': '~0.803.9',
      '@angular-devkit/build-ng-packagr': '~0.803.9',
      '@angular-devkit/build-webpack': '~0.803.9',
      'zone.js': '~0.10.0',
      tsickle: '^0.37.0',
      'ng-packagr': '^5.0.0',
      'web-animations-js': '^2.3.2',
    };

    for (const [name, version] of Object.entries(dependenciesToUpdate)) {
      const current = getPackageJsonDependency(host, name);
      if (!current || current.version === version) {
        continue;
      }

      addPackageJsonDependency(host, {
        type: current.type,
        name,
        version,
        overwrite: true,
      });
    }
  };
}
