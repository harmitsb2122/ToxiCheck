import models.ml.classifier as clf
import models.ml.classifier1 as clf1
import models.ml.classifier2 as clf2
from fastapi import FastAPI, Body
from joblib import load
from models.bullying import Bullying
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]
app = FastAPI(title="Bullying ML API", description="API for cyber-bullying dataset ml model", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_sentence1(data):
    clf1.model=load('models/ml/modelcv.joblib')
    prediction1=clf1.model.transform(data)
    # print(prediction1)
    return prediction1

def read_sentence2(data):
    clf2.model=load('models/ml/modeltfid.joblib')
    clf2.model.fit(data)
    prediction2=clf2.model.transform(data)
    return prediction2

received = {}


@app.on_event('startup')
async def load_model():
    clf.model = load('models/ml/model.joblib')


@app.post('/predict', tags=["predictions"])
async def get_prediction(bullying: Bullying):
    if bullying.data[0][0] in received.keys():
        return received[bullying.data[0][0]]
    print(bullying)
    data = bullying.data[0]
    print(data)
    xtf1=read_sentence1(data)
    print("printing xtf1-shape")
    print(xtf1.dtype)
    xtf=read_sentence2(xtf1)
    print("printing xtf.shape")
    print(xtf.dtype)
    prediction = clf.model.predict(xtf)
    received[bullying.data[0][0]] = list(prediction.tolist())
    return list(prediction.tolist())

uvicorn.run(app,host='localhost',port=8000)