import React from 'react';

import { SvgIcon } from '@material-ui/core';

export default function Dashboard(props) {
  return (
    <SvgIcon {...props}>
      <svg>
        <g>
          <path d="M11.88 0C5.526 0 .332 5.318.332 11.823c0 6.506 5.194 11.824 11.548 11.824s11.548-5.318 11.548-11.824C23.428 5.318 18.234 0 11.88 0zm0 22.515c-5.747 0-10.443-4.808-10.443-10.692 0-5.883 4.641-10.692 10.443-10.692S22.323 5.94 22.323 11.823c0 5.884-4.696 10.692-10.443 10.692z"></path>
          <path d="M11.88 3.055c-4.752 0-8.62 3.96-8.62 8.825 0 4.865 3.868 8.825 8.62 8.825 4.752 0 8.62-3.96 8.62-8.825 0-4.865-3.868-8.825-8.62-8.825zm4.365 4.356l-2.984 3.96c.11.566-.11 1.188-.497 1.584-.331.34-.829.509-1.27.509-.443 0-.94-.17-1.272-.51a1.84 1.84 0 010-2.601c.387-.396.995-.623 1.547-.51l3.924-3.054c.165-.114.386-.114.497.056.166.226.166.453.055.566z"></path>
        </g>
      </svg>
    </SvgIcon>
  );
}