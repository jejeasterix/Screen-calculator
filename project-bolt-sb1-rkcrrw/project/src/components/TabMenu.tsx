import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Monitor, Projector } from 'lucide-react';
import { ScreenCalculator } from './ScreenCalculator';
import { ProjectorCalculator } from './ProjectorCalculator';
import { RoomDimensions } from './RoomDimensions';
import { Logo } from './Logo';

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
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 relative">
              <Logo />
              {categories.map((category) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-indigo-700'
                        : 'text-indigo-700 hover:bg-white/[0.12] hover:text-indigo-800'
                    )
                  }
                >
                  <div className="flex items-center justify-center gap-2">
                    {React.createElement(category.icon, { className: 'w-5 h-5' })}
                    {category.name}
                  </div>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
      <div className="pt-16">
        <Tab.Group>
          <Tab.Panels>
            {categories.map((category, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-4',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2'
                )}
              >
                {category.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
