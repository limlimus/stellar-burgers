import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { orderBurgerThunk } from '../../services/slices/consructor-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (store: RootState) => store.constructorItems.constructorItems
  );
  const isAuth = useSelector((store: RootState) => store.user.isAuthenticated);
  const orderRequest = useSelector(
    (store: RootState) => store.constructorItems.orderRequest
  );
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = async () => {
    const { bun, ingredients } = constructorItems;
    if (!bun) {
      throw new Error('Выберите булку для заказа');
    }
    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    if (!constructorItems.bun || orderRequest) return;

    const response = (await dispatch(orderBurgerThunk(ingredientIds))) as any;
    setOrderModalData(response.payload.order);
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isAuth={isAuth}
    />
  );
};
