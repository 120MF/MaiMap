import json
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from pypinyin import lazy_pinyin

# 配置 WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # 无头模式
driver = webdriver.Chrome(options=options)

# 目标 URL
url = 'http://wc.wahlap.net/maidx/location/index.html'  # 替换为实际的 URL

# 打开页面
driver.get(url)

# 等待 class="store_list" 的 ul 元素加载完成
try:
    ul_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'store_list'))
    )
except Exception as e:
    print(f"Error waiting for store_list: {e}")
    driver.quit()
    exit()

# 获取页面内容
page_content = driver.page_source
driver.quit()

# 使用 BeautifulSoup 解析 HTML
soup = BeautifulSoup(page_content, 'html.parser')
store_list = soup.find('ul', class_='store_list')
stores = []

# 读取现有的 JSON 文件
try:
    with open('arcades.json', 'r', encoding='utf-8') as f:
        existing_stores = json.load(f)
except FileNotFoundError:
    existing_stores = []

# 将现有的 JSON 文件转换为字典，方便查找
existing_stores_dict = {store['store_address']: store for store in existing_stores}

# 全局变量 QMAP_KEY
QMAP_KEY = '4BQBZ-6DJWA-MJDKJ-CEHME-I4AL7-IDBK7'  # 替换为你的 QMAP_KEY

id = 1

# 提取每个 li 元素中的 store_name 和 store_address
for li in store_list.find_all('li'):
    store_name = li.find('span', class_='store_name').text.strip()
    store_address = li.find('span', class_='store_address').text.strip()

    # 检查是否已经存在位置信息
    if store_address in existing_stores_dict and 'pos' in existing_stores_dict[store_address]:
        pos = existing_stores_dict[store_address]['pos']
    else:
        # 发送请求获取位置信息
        response = requests.get('https://apis.map.qq.com/ws/geocoder/v1/', params={
            'address': store_address,
            'key': QMAP_KEY
        })
        result = response.json()
        # print(result);
        if result['status'] == 0:
            location = result['result']['location']
            pos = [location['lat'], location['lng']]
        else:
            pos = [None, None]
        print(store_name)
        print(store_address)
        print(pos)
        time.sleep(0.2)  # 每0.2秒发送一次请求
        

    stores.append({
        'store_name': store_name,
        'store_address': store_address,
        'pos': pos,
        'id': id,
    })

    id += 1

sorted_stores = sorted(stores, key=lambda x: lazy_pinyin(x['store_address'])[0][0])

# 导出为 JSON 文件
with open('arcades.json', 'w', encoding='utf-8') as f:
    json.dump(sorted_stores, f, ensure_ascii=False, indent=4)

print('Data has been exported to stores.json')