import React, { Component, Fragment } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import ScrollPane from "visual/component/ScrollPane";
import EditorIcon from "visual/component/EditorIcon";
import { fontSelector, projectSelector } from "visual/redux/selectors";
import Sidebar from "./common/Sidebar";
import SearchInput from "./common/SearchInput";
import DataFilter from "./common/DataFilter";
import ThumbnailGrid from "./common/ThumbnailGrid";
import { blockTemplateThumbnailUrl } from "visual/utils/blocks";
import { assetUrl } from "visual/utils/asset";
import {
  getUsedModelsFonts,
  getBlocksStylesFonts
} from "visual/utils/traverse";
import { t } from "visual/utils/i18n";
import { normalizeFonts } from "visual/utils/fonts";

let defaultFilter = {
  type: 0,
  category: "*",
  search: ""
};

class Blocks extends Component {
  static defaultProps = {
    showSidebar: true,
    showSearch: true,
    showType: true, // dark | light
    showCategories: true,
    categoriesFilter: categories => categories,
    onAddBlocks: _.noop,
    onClose: _.noop
  };

  state = {
    data: null
  };

  async componentDidMount() {
    const { categoriesFilter, selectedKit } = this.props;

    // filter categories
    const url = assetUrl("kits/meta.json");
    const r = await fetch(url);
    const data = await r.json();
    const categories = categoriesFilter([
      {
        id: "*",
        title: t("All Categories")
      },
      ...data.categories
    ]);

    // filter blocks
    const categoryIds = new Map(categories.map(cat => [cat.id, true]));
    const blocks = data.kits
      .find(({ id }) => id === selectedKit)
      .blocks.filter(block => block.cat.some(cat => categoryIds.get(cat)));

    this.setState({
      data,
      blocks,
      categories
    });
  }

  handleThumbnailAdd = async thumbnailData => {
    const { projectFonts, onAddBlocks, onClose } = this.props;
    const block = await fetch(
      assetUrl(`kits/resolves/${thumbnailData.id}.json`)
    );
    const blockData = await block.json();
    const resolve = { ...blockData, blockId: thumbnailData.id };
    const fontsDiff = getBlocksStylesFonts(
      getUsedModelsFonts({ models: resolve }),
      projectFonts
    );
    const fonts = await normalizeFonts(fontsDiff);

    onAddBlocks({
      block: resolve,
      fonts
    });
    onClose();
  };

  renderLoading() {
    const { showSidebar, showSearch, HeaderSlotLeft } = this.props;

    return (
      <Fragment>
        {showSearch && (
          <HeaderSlotLeft>
            <SearchInput className="brz-ed-popup-two-header__search" />
          </HeaderSlotLeft>
        )}
        {showSidebar && (
          <div className="brz-ed-popup-two-body__sidebar">
            <div className="brz-ed-popup-two-sidebar-body" />
          </div>
        )}
        <div className="brz-ed-popup-two-body__content brz-ed-popup-two-body__content--loading">
          <EditorIcon icon="nc-circle-02" className="brz-ed-animated--spin" />
        </div>
      </Fragment>
    );
  }

  render() {
    const { data, blocks, categories: categories_ } = this.state;

    if (!data) {
      return this.renderLoading();
    }

    const {
      showSearch,
      showSidebar,
      showType,
      showCategories,
      HeaderSlotLeft
    } = this.props;
    const thumbnails = blocks.map(block => ({
      ...block,
      thumbnailSrc: blockTemplateThumbnailUrl(block)
    }));
    const filterFn = (item, currentFilter) => {
      const typeMatch = currentFilter.type === item.type;

      const categoryMatch =
        currentFilter.category === "*" ||
        item.cat.includes(Number(currentFilter.category));

      const searchMatch =
        currentFilter.search === "" ||
        new RegExp(
          currentFilter.search.replace(/[.*+?^${}()|[\]\\]/g, ""),
          "i"
        ).test(item.keywords);

      return typeMatch && categoryMatch && searchMatch;
    };

    const countersColorBlocks = {};
    const countersSectionBlocks = {};
    const categories = categories_.filter(({ hidden }) => hidden !== true);

    return (
      <DataFilter
        data={thumbnails}
        filterFn={filterFn}
        defaultFilter={defaultFilter}
      >
        {(filteredThumbnails, currentFilter, setFilter) => {
          defaultFilter.type = currentFilter.type;

          if (!countersColorBlocks[currentFilter.type]) {
            for (let i = 0; i < blocks.length; i++) {
              const blockType = blocks[i].type; // dark | light
              const blockCategories = blocks[i].cat; // header | footer etc.

              if (countersColorBlocks[blockType] === undefined) {
                countersColorBlocks[blockType] = 1;
              } else {
                countersColorBlocks[blockType]++;
              }

              if (currentFilter.type === blockType) {
                countersSectionBlocks["*"] = countersColorBlocks[blockType];

                for (let j = 0; j < blockCategories.length; j++) {
                  const category = blockCategories[j];

                  if (countersSectionBlocks[category] === undefined) {
                    countersSectionBlocks[category] = 1;
                  } else {
                    countersSectionBlocks[category]++;
                  }
                }
              }
            }
          }

          return (
            <Fragment>
              {showSearch && (
                <HeaderSlotLeft>
                  <SearchInput
                    className="brz-ed-popup-two-header__search"
                    value={currentFilter.search}
                    onChange={value => setFilter({ search: value })}
                  />
                </HeaderSlotLeft>
              )}
              {showSidebar && (
                <div className="brz-ed-popup-two-body__sidebar">
                  <ScrollPane
                    style={{
                      overflow: "hidden",
                      height: "100%"
                    }}
                    className="brz-ed-scroll--new-dark brz-ed-scroll--medium"
                  >
                    <div className="brz-ed-popup-two-sidebar-body">
                      {showType && (
                        <Sidebar
                          title="STYLES"
                          options={data.types}
                          counters={countersColorBlocks}
                          value={currentFilter.type}
                          onChange={value => setFilter({ type: value })}
                        />
                      )}
                      {showCategories && (
                        <Sidebar
                          options={categories}
                          counters={countersSectionBlocks}
                          value={currentFilter.category}
                          onChange={value => setFilter({ category: value })}
                        />
                      )}
                    </div>
                  </ScrollPane>
                </div>
              )}
              <div className="brz-ed-popup-two-body__content">
                <ScrollPane
                  style={{
                    overflow: "hidden",
                    height: "100%"
                  }}
                  className="brz-ed-scroll--new-dark brz-ed-scroll--medium"
                >
                  {filteredThumbnails.length > 0 ? (
                    <ThumbnailGrid
                      data={filteredThumbnails}
                      onThumbnailAdd={this.handleThumbnailAdd}
                    />
                  ) : (
                    <div className="brz-ed-popup-two-blocks__grid brz-ed-popup-two-blocks__grid-clear">
                      <p className="brz-ed-popup-two-blocks__grid-clear-text">
                        {t("Nothing here, please refine your search.")}
                      </p>
                    </div>
                  )}
                </ScrollPane>
              </div>
            </Fragment>
          );
        }}
      </DataFilter>
    );
  }
}

const mapStateToProps = state => ({
  selectedKit: projectSelector(state).data.selectedKit,
  projectFonts: fontSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(Blocks);
