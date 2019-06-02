//
//  FoodClassifierBridge.m
//  CoreMLImageClassifierSample
//
//  Created by Ary on 2019/06/02.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FoodClassifier, NSObject)

RCT_EXTERN_METHOD(predict:(NSString *)source findEventsWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
