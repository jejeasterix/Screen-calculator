import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Monitor, Projector } from 'lucide-react';
import { ScreenCalculator } from './ScreenCalculator';
import { ProjectorCalculator } from './ProjectorCalculator';
import { RoomDimensions } from './RoomDimensions';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function TabMenu() {
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 300,
    depth: 500,
  });
  const [isMetric, setIsMetric] = useState(false);
  const [inputValue, setInputValue] = useState(86);
  const [dimensionType, setDimensionType] = useState<'diagonal' | 'width' | 'height'>('diagonal');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '21:9'>('16:9');
  const [bottomHeight, setBottomHeight] = useState<number | null>(100);

  const categories = [
    {
      name: 'Screen Calculator',
      icon: Monitor,
      content: (
        <ScreenCalculator
          inputValue={inputValue}
          setInputValue={setInputValue}
          dimensionType={dimensionType}
          setDimensionType={setDimensionType}
          isMetric={isMetric}
          setIsMetric={setIsMetric}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          roomDimensions={dimensions}
          setRoomDimensions={setDimensions}
          bottomHeight={bottomHeight}
          setBottomHeight={setBottomHeight}
        />
      ),
    },
    {
      name: 'Projector Calculator',
      icon: Projector,
      content: (
        <ProjectorCalculator
          inputValue={inputValue}
          setInputValue={setInputValue}
          dimensionType={dimensionType}
          setDimensionType={setDimensionType}
          isMetric={isMetric}
          setIsMetric={setIsMetric}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          roomDimensions={dimensions}
          setRoomDimensions={setDimensions}
          bottomHeight={bottomHeight}
          setBottomHeight={setBottomHeight}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-8">
          {categories.map((category) => (
            <Tab.Panel
              key={category.name}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {category.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
