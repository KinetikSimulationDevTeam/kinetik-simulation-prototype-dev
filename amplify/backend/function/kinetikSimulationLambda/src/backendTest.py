import unittest
from unittest import mock
import index
import numpy
import json

class TestSimulation(unittest.TestCase):

    # mimimum values test
    def test_min_vals(self):
        # set seed for numpy random number generator
        rng = numpy.random.RandomState(1234)

        # define JSON for input
        jsonObj = {
            "weeks": 1,
            "ops": [1, 0, 0],
            "stages": ["stage1", "win", "loss"],
            "sources": ["source1"],
            "means": [1],
            "stds": [1],
            "newOpsProbabilities": [.4, .3, .3],
            "opsProbabilities": [[.4, .3, .3],
                                    [0, 1, 0],
                                    [0, 0, 1]]

        }
        jsonString = json.dumps(jsonObj)

        # define request JSON Object to input to lambda (only body is needed)
        req = {"body": json.dumps(jsonString)}

        # patch numpy in index to use seeded random number generator
        with mock.patch.object(index.numpy, "random", rng):
            # call lambda and get output
            output = index.handler(req, {})

            # save output body in variable
            body = output["body"]

            # expected output based on seed and input variables
            expectedOutputBody = [
                [
                {"Stage": "stage1","values": 1.0},
                {"Stage": "win",'values': 0.7},
                {"Stage": "loss","values": 0.7},
                ]
            ]
            # convert to json string
            expectedJSON = json.dumps(expectedOutputBody)

            # assert the expected output matches the observed output
            self.assertEqual(expectedJSON, body)

    # multiple weeks test
    def test_multi_week(self):
            # set seed for numpy random number generator
            rng = numpy.random.RandomState(1234)

            # define JSON for input
            jsonObj = {
                "weeks": 3,
                "ops": [1, 0, 0],
                "stages": ["stage1", "win", "loss"],
                "sources": ["source1"],
                "means": [1],
                "stds": [1],
                "newOpsProbabilities": [.4, .3, .3],
                "opsProbabilities": [[.4, .3, .3],
                                        [0, 1, 0],
                                        [0, 0, 1]]

            }
            jsonString = json.dumps(jsonObj)

            # define request JSON Object to input to lambda (only body is needed)
            req = {"body": json.dumps(jsonString)}

            # patch numpy in index to use seeded random number generator
            with mock.patch.object(index.numpy, "random", rng):
                # call lambda and get output
                output = index.handler(req, {})

                # save output body in variable
                body = output["body"]

                # expected output based on seed and input variables
                expectedOutputBody = [
                     [
                     {"Stage": "stage1", "values": 1.0}, 
                     {"Stage": "win", "values": 0.7}, 
                     {"Stage": "loss", "values": 0.7}
                     ], 
                     [
                     {"Stage": "stage1", "values": 0.3}, 
                     {"Stage": "win", "values": 1.0}, 
                     {"Stage": "loss", "values": 1.0}
                     ], 
                     [
                     {"Stage": "stage1", "values": 1.1}, 
                     {"Stage": "win", "values": 1.8}, 
                     {"Stage": "loss", "values": 1.8}
                     ]
                ]
                # convert to json string
                expectedJSON = json.dumps(expectedOutputBody)

                # assert the expected output matches the observed output
                self.assertEqual(expectedJSON, body)

    # multiple sources test
    def test_multi_source(self):
            # set seed for numpy random number generator
            rng = numpy.random.RandomState(1234)

            # define JSON for input
            jsonObj = {
                "weeks": 3,
                "ops": [1, 0, 0],
                "stages": ["stage1", "win", "loss"],
                "sources": ["source1", "source2", "source3"],
                "means": [1, 1, 1],
                "stds": [1, 1, 1],
                "newOpsProbabilities": [.4, .3, .3],
                "opsProbabilities": [[.4, .3, .3],
                                        [0, 1, 0],
                                        [0, 0, 1]]

            }
            jsonString = json.dumps(jsonObj)

            # define request JSON Object to input to lambda (only body is needed)
            req = {"body": json.dumps(jsonString)}

            # patch numpy in index to use seeded random number generator
            with mock.patch.object(index.numpy, "random", rng):
                # call lambda and get output
                output = index.handler(req, {})

                # save output body in variable
                body = output["body"]

                # expected output based on seed and input variables
                expectedOutputBody = [
                     [
                     {"Stage": "stage1", "values": 1.9}, 
                     {"Stage": "win", "values": 1.4}, 
                     {"Stage": "loss", "values": 1.4}
                     ], 
                     [
                     {"Stage": "stage1", "values": 1.9}, 
                     {"Stage": "win", "values": 2.8}, 
                     {"Stage": "loss", "values": 2.8}
                     ], 
                     [
                     {"Stage": "stage1", "values": 2.1}, 
                     {"Stage": "win", "values": 4.4}, 
                     {"Stage": "loss", "values": 4.4}
                     ]
                ]
                # convert to json string
                expectedJSON = json.dumps(expectedOutputBody)

                # assert the expected output matches the observed output
                self.assertEqual(expectedJSON, body)

    # multiple stages test
    def test_multi_stages(self):
            # set seed for numpy random number generator
            rng = numpy.random.RandomState(1234)

            # define JSON for input
            jsonObj = {
                "weeks": 1,
                "ops": [1, 1, 1, 0, 0],
                "stages": ["stage1", "stage2", "stage3", "win", "loss"],
                "sources": ["source1"],
                "means": [1],
                "stds": [1],
                "newOpsProbabilities": [.2, .2, .2, .1, .1],
                "opsProbabilities": [[.2, .2, .2, .1, .1],
                                     [.2, .2, .2, .1, .1],
                                     [.2, .2, .2, .1, .1],
                                        [0, 0, 0, 1, 0],
                                        [0, 0, 0, 0, 1]]

            }
            jsonString = json.dumps(jsonObj)

            # define request JSON Object to input to lambda (only body is needed)
            req = {"body": json.dumps(jsonString)}

            # patch numpy in index to use seeded random number generator
            with mock.patch.object(index.numpy, "random", rng):
                # call lambda and get output
                output = index.handler(req, {})

                # save output body in variable
                body = output["body"]

                # expected output based on seed and input variables
                expectedOutputBody = [
                     [
                     {"Stage": "stage1", "values": 0.9}, 
                     {"Stage": "stage2", "values": 0.9}, 
                     {"Stage": "stage3", "values": 0.9}, 
                     {"Stage": "win", "values": 0.4}, 
                     {"Stage": "loss", "values": 0.4}
                     ]
                ]
                # convert to json string
                expectedJSON = json.dumps(expectedOutputBody)

                # assert the expected output matches the observed output
                self.assertEqual(expectedJSON, body)

    # multiple stages and sources test
    def test_multi_stages_and_sources(self):
            # set seed for numpy random number generator
            rng = numpy.random.RandomState(1234)

            # define JSON for input
            jsonObj = {
                "weeks": 1,
                "ops": [1, 1, 1, 0, 0],
                "stages": ["stage1", "stage2", "stage3", "win", "loss"],
                "sources": ["source1", "source2"],
                "means": [1, 1],
                "stds": [1, 1],
                "newOpsProbabilities": [.2, .2, .2, .1, .1],
                "opsProbabilities": [[.2, .2, .2, .1, .1],
                                     [.2, .2, .2, .1, .1],
                                     [.2, .2, .2, .1, .1],
                                        [0, 0, 0, 1, 0],
                                        [0, 0, 0, 0, 1]]

            }
            jsonString = json.dumps(jsonObj)

            # define request JSON Object to input to lambda (only body is needed)
            req = {"body": json.dumps(jsonString)}

            # patch numpy in index to use seeded random number generator
            with mock.patch.object(index.numpy, "random", rng):
                # call lambda and get output
                output = index.handler(req, {})

                # save output body in variable
                body = output["body"]

                # expected output based on seed and input variables
                expectedOutputBody = [
                     [
                     {"Stage": "stage1", "values": 0.9}, 
                     {"Stage": "stage2", "values": 0.9}, 
                     {"Stage": "stage3", "values": 0.9}, 
                     {"Stage": "win", "values": 0.4}, 
                     {"Stage": "loss", "values": 0.4}
                     ]
                ]
                # convert to json string
                expectedJSON = json.dumps(expectedOutputBody)

                # assert the expected output matches the observed output
                self.assertEqual(expectedJSON, body)

    # invalid weeks test
    def test_invalid_weeks(self):
        # set seed for numpy random number generator
        rng = numpy.random.RandomState(1234)

        # define JSON for input
        jsonObj = {
            "weeks": -1,
            "ops": [1, 0, 0],
            "stages": ["stage1", "win", "loss"],
            "sources": ["source1"],
            "means": [1],
            "stds": [1],
            "newOpsProbabilities": [.4, .3, .3],
            "opsProbabilities": [[.4, .3, .3],
                                    [0, 1, 0],
                                    [0, 0, 1]]

        }
        jsonString = json.dumps(jsonObj)

        # define request JSON Object to input to lambda (only body is needed)
        req = {"body": json.dumps(jsonString)}

        # patch numpy in index to use seeded random number generator
        with mock.patch.object(index.numpy, "random", rng):
            # call lambda and get output
            output = index.handler(req, {})

            # save output body in variable
            body = output["body"]

            # expected output based on seed and input variables
            expectedOutputBody = []
            
            # convert to json string
            expectedJSON = json.dumps(expectedOutputBody)

            # assert the expected output matches the observed output
            self.assertEqual(expectedJSON, body)

if __name__ == '__main__':
    unittest.main()
