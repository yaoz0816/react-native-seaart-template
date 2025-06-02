/**
 * @author 曼巴
 * @filename NavigationDetailDemo.tsx
 * @date 2025-05-31 星期六
 * @description 导航详情页面 - 展示参数接收和传递
 */

import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { goBack, navigate } from '@/navigation/configs/utils'
import { Toast } from '@/utils/toast'

interface RouteParams {
  title?: string
  message?: string
  userId?: string
  data?: any
  timestamp?: number
  callback?: (value: string) => void
}

const NavigationDetailDemo: React.FC = () => {
  const route = useRoute()
  const [returnValue, setReturnValue] = useState('')
  const [visitCount, setVisitCount] = useState(0)

  // 使用useMemo优化params
  const params = useMemo(
    () => (route.params as RouteParams) || {},
    [route.params],
  )

  // 监听页面焦点
  useFocusEffect(
    React.useCallback(() => {
      setVisitCount((prev) => prev + 1)
      console.log('📱 NavigationDetailDemo 获得焦点', { params })
    }, [params]),
  )

  // 返回并传递值
  const handleReturnWithValue = useCallback(() => {
    console.log('handleReturnWithValue', returnValue)

    if (!returnValue) {
      Toast.error('提示:请输入要返回的值')
      return
    }

    params.callback?.(returnValue)
    goBack()
  }, [params, returnValue])

  // 链式导航
  const handleChainNavigation = () => {
    navigate('ToastExamplesDemo')
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📋 导航详情页面</Text>
          <Text style={styles.subtitle}>展示参数接收、处理和返回值传递</Text>
          <Text style={styles.visitCounter}>访问次数: {visitCount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 接收到的参数</Text>

          {Object.keys(params).length > 0 ? (
            <View style={styles.paramsContainer}>
              {Object.entries(params).map(([key, value]) => (
                <View key={key} style={styles.paramItem}>
                  <Text style={styles.paramKey}>{key}:</Text>
                  <Text style={styles.paramValue}>
                    {typeof value === 'object'
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyParams}>
              <Text style={styles.emptyText}>未接收到参数</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 路由信息</Text>

          <View style={styles.routeInfo}>
            <Text style={styles.infoItem}>路由名称: {route.name}</Text>
            <Text style={styles.infoItem}>路由键: {route.key}</Text>
            <Text style={styles.infoItem}>
              参数数量: {Object.keys(params).length}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>↩️ 返回值传递</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>输入返回值:</Text>
            <TextInput
              style={styles.input}
              value={returnValue}
              placeholder={'输入要返回的数据...'}
              multiline={true}
              numberOfLines={3}
              onChangeText={setReturnValue}
            />
          </View>

          <Pressable
            style={styles.actionButton}
            onPress={handleReturnWithValue}>
            <Text style={styles.actionButtonText}>返回并传递值</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 更多导航操作</Text>

          <Pressable
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleChainNavigation}>
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              链式导航到Toast页面
            </Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.dangerButton]}
            onPress={() => goBack()}>
            <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
              直接返回上一页
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡
            这个页面展示了如何接收和处理导航参数，以及如何返回数据给上一个页面
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  visitCounter: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 16,
  },
  paramsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  paramItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  paramKey: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  paramValue: {
    fontSize: 14,
    color: '#6c757d',
    fontFamily: 'monospace',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  emptyParams: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  routeInfo: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 16,
  },
  infoItem: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#495057',
    textAlignVertical: 'top',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  dangerButtonText: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    marginTop: 12,
    backgroundColor: '#fff3cd',
  },
  footerText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 20,
  },
})

export default NavigationDetailDemo
