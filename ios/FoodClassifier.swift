//
//  FoodClassifier.swift
//  CoreMLImageClassifierSample
//
//  Created by Ary on 2019/06/02.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import Vision
import CoreML

@objc(FoodClassifier)
class FoodClassifier: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc(predict:findEventsWithResolver:rejecter:)
  func predict(source: String, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    guard let model = try? VNCoreMLModel(for: ImageClassifier()!.model!) else {
      fatalError("Error VNCoreMLModel")
    }
    let request = VNCoreMLRequest(model: model) { request, error in
      guard let results = request.results as? [VNClassificationObservation] else {
        fatalError("Error request.results")
      }
      if let classification = results.first {
        resolve([
          "identifier": classification.identifier,
          "confidence": classification.confidence
          ])
        return
      } else {
        fatalError("Error results.first")
      }
    }
    
    let imageURL = URL(string: source)
    guard let ciImage = CIImage(contentsOf: imageURL!) else {
      fatalError("Error CIImage")
    }
    
    let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
    guard (try? handler.perform([request])) != nil else {
      fatalError("Error handler.perform")
    }
  }
}

