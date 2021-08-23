import React from 'react';

import { SvgIcon } from '@material-ui/core';

export default function NotificationBell(props) {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 39 38">
        <path d="M26.875 13.218c0-5.467-3.955-10.022-9.168-10.842v-.638c0-.911-.629-1.64-1.528-1.731-.988-.091-1.797.729-1.797 1.731v.729c-5.214.82-9.169 5.375-9.169 10.842C5.213 32.169 0 24.516 0 30.165c0 .455.36.91.899.91H31.1c.45 0 .899-.364.899-.91V29.8c.09-4.829-5.124 1.822-5.124-16.582zM16.09 38c2.967 0 5.393-2.369 5.573-5.284H10.517C10.697 35.63 13.123 38 16.088 38z"></path>
      </svg>
    </SvgIcon>
  );
}
