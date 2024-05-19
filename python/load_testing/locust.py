import time
from locust import HttpUser,task, between

class WebsiteUser(HttpUser):
    wait_time=between(1,5)

    @task
    def getReceipt_t_00050(self):
        headers = {
            "tenantid": "00050"  # Replace with your actual tenant ID value
        }
        self.client.get(url="/api/order/getReceipt/1",headers=headers)


    @task
    def getReceipt_t_00062(self):
        headers = {
            "tenantid": "00062"  # Replace with your actual tenant ID value
        }
        self.client.get(url="/api/order/getReceipt/1",headers=headers)



    @task
    def addOrder_t_00050(self):
            headers = {
                "tenantid": "00050"  # Replace with your actual tenant ID value
            }
            payload = {
                "customerId": 13,
                "terminalId": 2,
                "sessionId": 10,
                "discountOffer": 0,
                "orderList": [
                    {"productId": 2, "unitPrice": "200", "qty": 4, "lineDiscount_perc": "0"},
                    {"productId": 3, "unitPrice": "2000", "qty": 1, "lineDiscount_perc": "5"},
                    {"productId": 4, "unitPrice": "950", "qty": 1, "lineDiscount_perc": "0"},
                     {"productId":12, "unitPrice": "1000", "qty": 1, "lineDiscount_perc": "0"},
                    # {"productId": 2, "unitPrice": "200", "qty": -1, "lineDiscount_perc": "0", "returnItem": {"isReturned": "1", "orderDetailId": 46}}
                    # Add more order items if needed
                ],
                "paymentList": [
                    {
                        "methodId": 1,
                        "amountPaid": 4650,
                        "cardHolderName": None,
                        "cardTypeId": None,
                        "cardLastFourDigits": None,
                        "cardExpirationMonth": None,
                        "cardExpirationYear": None
                    }
                    # Add more payment methods if needed
                ],
                "isConfirm": True
            }

            self.client.post(url="/api/order/orderAdd", json=payload, headers=headers)


    @task
    def addOrder_t_00062_terminal2_session10(self):
            headers = {
                "tenantid": "00062"  # Replace with your actual tenant ID value
            }
            payload = {
                "customerId": 14,
                "terminalId": 2,
                "sessionId": 10,
                "discountOffer": 0,
                "orderList": [
                    {"productId": 2, "unitPrice": "200", "qty": 4, "lineDiscount_perc": "0"},
                    {"productId": 13, "unitPrice": "2000", "qty": 1, "lineDiscount_perc": "5"},
                    {"productId": 4, "unitPrice": "950", "qty": 1, "lineDiscount_perc": "0"},
                     {"productId":12, "unitPrice": "1000", "qty": 1, "lineDiscount_perc": "0"},
                    # {"productId": 2, "unitPrice": "200", "qty": -1, "lineDiscount_perc": "0", "returnItem": {"isReturned": "1", "orderDetailId": 46}}
                    # Add more order items if needed
                ],
                "paymentList": [
                    {
                        "methodId": 1,
                        "amountPaid": 4650,
                        "cardHolderName": None,
                        "cardTypeId": None,
                        "cardLastFourDigits": None,
                        "cardExpirationMonth": None,
                        "cardExpirationYear": None
                    }
                    # Add more payment methods if needed
                ],
                "isConfirm": True
            }

            self.client.post(url="/api/order/orderAdd", json=payload, headers=headers)

    # @task
    # def getReceipt_t_00062_terminal10_session_11(self):
    #         headers = {
    #             "tenantid": "00062"  # Replace with your actual tenant ID value
    #         }
    #         payload = {
    #             "customerId": 14,
    #             "terminalId": 10,
    #             "sessionId": 11,
    #             "discountOffer": 0,
    #             "orderList": [
    #                 {"productId": 2, "unitPrice": "200", "qty": 4, "lineDiscount_perc": "0"},
    #                 {"productId": 14, "unitPrice": "2000", "qty": 1, "lineDiscount_perc": "5"},
    #                 {"productId": 4, "unitPrice": "950", "qty": 1, "lineDiscount_perc": "0"},
    #                  {"productId":12, "unitPrice": "1000", "qty": 1, "lineDiscount_perc": "0"},
    #                 # {"productId": 2, "unitPrice": "200", "qty": -1, "lineDiscount_perc": "0", "returnItem": {"isReturned": "1", "orderDetailId": 46}}
    #                 # Add more order items if needed
    #             ],
    #             "paymentList": [
    #                 {
    #                     "methodId": 1,
    #                     "amountPaid": 4650,
    #                     "cardHolderName": None,
    #                     "cardTypeId": None,
    #                     "cardLastFourDigits": None,
    #                     "cardExpirationMonth": None,
    #                     "cardExpirationYear": None
    #                 }
    #                 # Add more payment methods if needed
    #             ],
    #             "isConfirm": True
    #         }

    #         self.client.post(url="/api/order/orderAdd", json=payload, headers=headers)

    # @task
    # def slow_page(self):
    #     self.client.get(url="/slow")