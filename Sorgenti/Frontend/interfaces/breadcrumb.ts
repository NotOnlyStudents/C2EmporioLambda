import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export interface BreadcrumbPath {
  name: string,
  href?: string,
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
