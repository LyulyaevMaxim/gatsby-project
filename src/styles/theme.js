import { createMuiTheme } from '@material-ui/core/styles'
import * as muiColors from '@material-ui/core/colors'
import { get } from 'lodash-es'

export const theme = createMuiTheme({
  palette: {
    getColor: (hue, shade) => get(muiColors, `[${hue}][${shade}]`),
  },
})