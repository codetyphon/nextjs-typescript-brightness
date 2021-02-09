import Slider from '@material-ui/core/Slider'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';


const IndexPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    const val = Math.round(newValue)
    console.log(val)
    setValue(val);
    fetch("/api/brightness", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ brightness: val }),
      method: "POST"
    })
  };
  const valuetext = (value:number) => {
    return `${value}`;
  }
  const getbrightness = () => {
    fetch("/api/brightness").then(res => { return res.json() }).then(val => {
      setValue(Math.round(val))
    })
  }
  useEffect(() => {
    getbrightness();
  }, [])
  return (
    <Layout title="brightness">
      <Slider value={value} onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        aria-labelledby="continuous-slider" />
    </Layout>
  )
}
export default IndexPage
