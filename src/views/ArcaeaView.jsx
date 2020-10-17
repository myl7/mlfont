import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, AppBar, Tab, Typography} from '@material-ui/core'
import {TabList, TabPanel, TabContext} from '@material-ui/lab'
import arcaeaProberApi from '../apis/arcaeaProberApi'
import ArcaeaSongs, {drawCountCharts, drawHealthCharts} from '../components/ArcaeaSongs'
import ArcaeaUserInfo from '../components/ArcaeaUserInfo'

const initArcaeaSongs = {c11: [], c10p: [], c10: [], c9p: [], c9: [], c8: [], c7: []}
const initArcaeaUserInfo = {name: null, code: null, ptt: null, join_date: null}

export default () => {
  const [arcaeaProberData, setArcaeaProberData] = useState({
    songs: initArcaeaSongs, userInfo: initArcaeaUserInfo
  })

  const handleCharts = (tabNum) => {
    const {songs} = arcaeaProberData

    const countChartElems = document.querySelectorAll('div.echart-pie')
    drawCountCharts(countChartElems, songs[tabNum])

    const healthChartElems = document.querySelectorAll('div.echart-bar')
    drawHealthCharts(healthChartElems, songs[tabNum])
  }

  useEffect(() => {
    arcaeaProberApi().then(data => {
      setArcaeaProberData(data)
      handleCharts('10')
    })
  }, [])

  const [tabNum, setTabNum] = useState('10')
  const handleTabSwitch = (_e, newTabNum) => {
    setTabNum(newTabNum)
  }

  useEffect(() => {
    handleCharts(tabNum)
  }, [tabNum])

  useEffect(() => {
    const {songs} = arcaeaProberData

    const countChartElems = document.querySelectorAll('div.echart-pie')
    drawCountCharts(countChartElems, songs[tabNum])

    const healthChartElems = document.querySelectorAll('div.echart-bar')
    drawHealthCharts(healthChartElems, songs[tabNum])
  }, [tabNum])

  const {songs, userInfo} = arcaeaProberData
  const {c11, c10p, c10, c9p, c9, c8, c7} = songs
  return (
    <Card>
      <CardContent>
        <Typography variant={'h4'}>
          Arcaea
        </Typography>
        <Divider style={{marginTop: '0.5em', marginBottom: '0.5em'}} />

        <ArcaeaUserInfo userInfo={userInfo} />

        <TabContext value={tabNum} style={{marginTop: '0.5em'}}>
          <AppBar>
            <TabList onChange={handleTabSwitch} aria-label={'select Arcaea song levels'}>
              <Tab label="11" value="11" />
              <Tab label="10+" value="10+" />
              <Tab label="10" value="10" />
              <Tab label="9+" value="9+" />
              <Tab label="9" value="9" />
              <Tab label="8" value="8" />
              <Tab label="7" value="7" />
            </TabList>
          </AppBar>
          <TabPanel value="11"><ArcaeaSongs songs={c11} /></TabPanel>
          <TabPanel value="10+"><ArcaeaSongs songs={c10p} /></TabPanel>
          <TabPanel value="10"><ArcaeaSongs songs={c10} /></TabPanel>
          <TabPanel value="9+"><ArcaeaSongs songs={c9p} /></TabPanel>
          <TabPanel value="9"><ArcaeaSongs songs={c9} /></TabPanel>
          <TabPanel value="8"><ArcaeaSongs songs={c8} /></TabPanel>
          <TabPanel value="7"><ArcaeaSongs songs={c7} /></TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}
