/**
 * @author 曼巴
 * @filename SeaArtSlideDrawer.tsx
 * @date 2023-12-05 Tuesday
 * @description 抽屉
 */
import { tw } from '@/utils/twcss/twrnc'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  Dimensions,
  LayoutAnimation,
  Modal,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

export interface SlideMenuRef {
  openDrawer: () => void
  closeDrawer: () => void
}

interface SlideMenuProps {
  children: ReactNode
  contentStyle?: StyleProp<ViewStyle>
  drawerWidth?: number
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const DEFAULT_DRAWER_WIDTH_RATIO = 0.85
const ANIMATION_DELAY = 150
const DRAWER_Z_INDEX = 9999

const SeaArtSlideDrawer = forwardRef<SlideMenuRef, SlideMenuProps>(
  (
    {
      children,
      contentStyle,
      drawerWidth = SCREEN_WIDTH * DEFAULT_DRAWER_WIDTH_RATIO,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = useCallback(() => {
      LayoutAnimation.easeInEaseOut()
      setOpen(false)
      setTimeout(() => {
        setVisible(false)
      }, ANIMATION_DELAY)
    }, [])

    const handleOpen = useCallback(() => {
      setVisible(true)
      requestAnimationFrame(() => {
        LayoutAnimation.easeInEaseOut()
        setOpen(true)
      })
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        openDrawer: handleOpen,
        closeDrawer: handleClose,
      }),
      [handleOpen, handleClose],
    )

    const overlayStyle = useMemo(
      () =>
        tw('absolute top-0 left-0 right-0 bottom-0 bg-black/50 w-full h-full'),
      [],
    )

    const drawerStyle = useMemo(
      () => [
        {
          width: drawerWidth,
          height: '100%',
          backgroundColor: 'white',
          zIndex: DRAWER_Z_INDEX,
          transform: [{ translateX: open ? 0 : -drawerWidth }],
        } as ViewStyle,
        contentStyle,
      ],
      [drawerWidth, open, contentStyle],
    )

    const backdropStyle = useMemo(
      () => tw('absolute top-0 left-0 right-0 bottom-0 w-full h-full'),
      [],
    )

    if (!visible) {
      return null
    }

    return (
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        animationType={'fade'}
        onRequestClose={handleClose}>
        <View style={overlayStyle}>
          <View style={drawerStyle}>{children}</View>
          {open && (
            <TouchableOpacity
              style={backdropStyle}
              activeOpacity={1}
              onPress={handleClose}
            />
          )}
        </View>
      </Modal>
    )
  },
)

export default SeaArtSlideDrawer
