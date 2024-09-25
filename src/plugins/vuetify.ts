import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { DefaultTheme } from '@/theme/LightTheme';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
export default createVuetify({
  components: {
    VDateInput,
    components
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'DefaultTheme',
    themes: {
      DefaultTheme
    }
  },
  defaults: {
    // VBtn: {},
    VCard: {
      rounded: 'md'
    },
    // VTextField: {
    //   rounded: 'lg'
    // },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top'
    },
    VTextField: {
    variant: 'outlined',
    density: 'compact',
    color: 'primary',
  },
  VTextarea: {
    variant: 'outlined',
    color: 'primary',
    density: 'compact',
  },
  VFileInput: {
    variant: 'outlined',
    color: 'primary',
    density: 'compact',
  },
  VSelect: {
    variant: 'outlined',
    color: 'primary',
    density: 'compact',
  },
  VDateInput: {
    variant: 'outlined',
    color: 'primary',
    density: 'compact',
  },
  VNumberInput: {
    variant: 'outlined',
    density: 'compact',
  },
  VCheckbox: {
    color: 'primary',
    density: 'compact',
  },
  VBtn: {
    size: 'small',
    color: 'primary',
    class: 'text-none'
  },
  // VCard: {
  //   elevation: 0,
  //   class: 'border',
  // },
  VChip: {
    size: 'small',
  }
  }
});
