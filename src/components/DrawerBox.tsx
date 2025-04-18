import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Select, SelectItem } from '@heroui/select';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useEffect, useState } from 'react';

import ArcadeDetail from '@/components/DrawerBoxComponents/ArcadeDetail.tsx';
import ArcadeDetailSkeleton from '@/components/DrawerBoxComponents/ArcadeDetailSkeleton';
import ArcadeList from '@/components/DrawerBoxComponents/ArcadeList';
import EditArcadeButton from '@/components/DrawerBoxComponents/EditArcadeButton';
import EditArcadeForm from '@/components/DrawerBoxComponents/EditArcadeForm';
import NewReviewButton from '@/components/DrawerBoxComponents/NewReviewButton';
import PathButton from '@/components/DrawerBoxComponents/PathButton';
import IconBxArrowFromBottom from '@/components/icons/IconBxArrowFromBottom';
import IconBxArrowToBottom from '@/components/icons/IconBxArrowToBottom';
import IconReturnDownBack from '@/components/icons/IconReturnDownBack';
import { useArcades } from '@/stores/useArcades';
import { useComments } from '@/stores/useComments.tsx';
import { useMap } from '@/stores/useMap';
import { useTags } from '@/stores/useTags';

function DrawerBox() {
  const [isOpen, setIsOpen] = useState(false);

  const { isEditing, setIsEditing } = useMap();
  const {
    arcadeId,
    detailArcade,
    nearbyArcades,
    sortMethod,
    update_sortMethod,
    update_arcadeId,
  } = useArcades();
  const { currentComments } = useComments();
  const { currentTags } = useTags();

  function toggleBox() {
    setIsOpen((state) => !state);
  }

  useEffect(() => {
    if (arcadeId > 0) setIsOpen(true);
  }, [arcadeId]);

  let headerContent = <div />;

  if (isEditing)
    headerContent = (
      <>
        <p className="text-xl order-1 ml-2">机厅编辑</p>
        <Button
          isIconOnly
          className="order-3 mr-2"
          size="sm"
          variant="bordered"
          onPress={() => {
            setIsEditing(false);
          }}
        >
          <IconReturnDownBack />
        </Button>
      </>
    );
  else if (arcadeId > 0)
    headerContent = (
      <>
        <p className="text-xl order-1 ml-2">机厅详情</p>
        <Button
          isIconOnly
          className="order-3 mr-2"
          size="sm"
          variant="bordered"
          onPress={() => {
            update_arcadeId(0);
          }}
        >
          <IconReturnDownBack />
        </Button>
      </>
    );
  else
    headerContent = (
      <>
        <p className="text-xl order-1 ml-2">机厅列表</p>
        <Select
          className="max-w-40 order-3 mr-2"
          defaultSelectedKeys=""
          label="排序方式"
          labelPlacement="outside-left"
          selectedKeys={[sortMethod]}
          size="sm"
          variant="underlined"
          onChange={(e) => {
            update_sortMethod(e.target.value);
          }}
        >
          <SelectItem key="DistanceAscending">距离升序</SelectItem>
          <SelectItem key="DistanceDescending">距离降序</SelectItem>
          <SelectItem key="PinyinAscending">拼音升序</SelectItem>
          <SelectItem key="PinyinDescending">拼音降序</SelectItem>
          <SelectItem key="Default">默认</SelectItem>
        </Select>
      </>
    );
  let bodyContent = <div />;

  if (isEditing)
    bodyContent = (
      <div className="p-2">
        <EditArcadeForm arcadeDetail={detailArcade} />
      </div>
    );
  else if (arcadeId > 0 && detailArcade?.store_name)
    bodyContent = <ArcadeDetail />;
  else if (nearbyArcades.length > 0)
    bodyContent = (
      <ArcadeList arcadeList={nearbyArcades} sortMethod={sortMethod} />
    );
  else
    bodyContent = (
      <p className="w-full text-xl p-5 text-stone-600">
        在指定范围内没有找到机厅。别气馁啦！
      </p>
    );

  let footerContent = <div />;

  if (arcadeId && detailArcade && !isEditing) {
    footerContent = (
      <CardFooter className="min-h-12 max-h-12 flex items-center gap-2 border-t-1 border-gray-400">
        <div className="ml-0">
          {/*<EditArcadeButton session={session}>编辑信息</EditArcadeButton>*/}
        </div>
        {/*<PathButton*/}
        {/*  endAddress={detailArcade.store_address}*/}
        {/*  startLat={targetLat}*/}
        {/*  startLng={targetLng}*/}
        {/*>*/}
        {/*  查看路线*/}
        {/*</PathButton>*/}
        {/*<NewReviewButton session={session} />*/}
      </CardFooter>
    );
  } else footerContent = <div />;

  return (
    <div className="relative z-20">
      <div
        className={`fixed bottom-[10%] left-0 transform translate-y-0 w-full h-[40%] transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-[90%]'
        }`}
      >
        <div className="flex items-center h-full">
          <Card
            isBlurred
            isFooterBlurred
            className="flex w-full h-full overflow-y-auto rounded-top"
            radius="none"
            shadow="md"
          >
            <CardHeader className="flex justify-between h-[10%]">
              <button type="button" className="h-3 fixed" onClick={toggleBox}>
                {isOpen ? (
                  <IconBxArrowToBottom className="h-[5%] top-[3%] fixed w-full" />
                ) : (
                  <IconBxArrowFromBottom className="h-[5%] top-[3%] fixed w-full" />
                )}
              </button>
              {headerContent}
            </CardHeader>
            <Divider />
            <CardBody className="px-0 py-0">{bodyContent}</CardBody>
            {footerContent}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DrawerBox;
