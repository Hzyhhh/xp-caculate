import { FC, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export const Index: FC<PropsWithChildren> = () => {
  return (
    <View className='index'>
      <Text >Hello world12!</Text>
      {/* <Button size="mini">12</Button> */}
    </View>
  )
}

export default Index
