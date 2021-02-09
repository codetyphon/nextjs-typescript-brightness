import React, { ReactNode } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    width:'90%',
    margin:'0 auto'
  }
}));

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width-device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no, minimal-ui" />
      </Head>
      <header><h1>{title}</h1></header>
      <div className={classes.page}>{children}</div>
      <footer>
      </footer>
    </div>
  )
}

export default Layout
